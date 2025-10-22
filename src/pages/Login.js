import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginStudent() {
  const navigate = useNavigate();
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!nim || !password) {
      setError("Semua field harus diisi!");
      return;
    }

    if (storedUser && storedUser.nim === nim && storedUser.password === password) {
      navigate("/home");
    } else {
      setError("NIM atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login FCC Student</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">NIM</label>
            <input
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register di sini
            </Link>
          </p>

          <p className="text-sm mt-2">
            <Link to="/staff-login" className="text-indigo-600 hover:underline">
              Login sebagai SASC Staff
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
