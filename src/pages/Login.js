import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fccLogo from "../Assets/Logo-FCC.png";

export default function Login() {
  const navigate = useNavigate();
  const [emailOrNim, setEmailOrNim] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  {/* Akun Staff */}
  const staffAccounts = [
    { username: "admin", password: "123456" },
    { username: "staff1", password: "654321" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!emailOrNim) {
      setMessage({ text: "NIM atau Username harus diisi!", type: "error" });
      return;
    }

    if (!password) {
      setMessage({ text: "Password harus diisi!", type: "error" });
      return;
    }

    const staff = staffAccounts.find(
      (s) => s.username === emailOrNim && s.password === password
    );
    if (staff) {
      setMessage({ text: "Login sebagai Staff berhasil!", type: "success" });
      setTimeout(() => navigate("/sasc-staff"), 1500);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const student = users.find(
      (u) => u.nim === emailOrNim && u.password === password
    );

    if (student) {
      localStorage.setItem("userName", student.nama);
      localStorage.setItem("userNIM", student.nim);

      setMessage({ text: "Login sebagai Student berhasil!", type: "success" });
      setTimeout(() => navigate("/role-selection"), 1500);
    } else {
      setMessage({ text: "NIM atau password salah!", type: "error" });
    }
  };

  return (
    // Card/Kotak Login
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${fccLogo})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md bg-white/70"></div>
      <div className="relative bg-white rounded-2xl shadow-lg p-8 w-[380px] border-t-4 border-blue-500 z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {message.text && (
          <div
            className={`p-2 text-sm rounded-md mb-3 text-center ${
              message.type === "error"
                ? "bg-red-100 text-red-600 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="NIM atau Username Staff"
            value={emailOrNim}
            onChange={(e) => setEmailOrNim(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
