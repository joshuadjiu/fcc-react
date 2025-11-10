import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fccLogo from "../Assets/Logo-FCC.png";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    faculty: "",
    jurusan: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    {/* Validasi input kosong */}
    if (!formData.nim) return setMessage({ text: "NIM harus diisi!", type: "error" });
    if (!formData.nama) return setMessage({ text: "Nama harus diisi!", type: "error" });
    if (!formData.faculty) return setMessage({ text: "Fakultas harus dipilih!", type: "error" });
    if (!formData.jurusan) return setMessage({ text: "Jurusan harus diisi!", type: "error" });
    if (!formData.password) return setMessage({ text: "Password harus diisi!", type: "error" });
    if (!formData.confirmPassword)
      return setMessage({ text: "Konfirmasi password harus diisi!", type: "error" });
    if (formData.password !== formData.confirmPassword)
      return setMessage({ text: "Password dan konfirmasi password tidak cocok!", type: "error" });

    {/* Menyimpan ke localstorage*/}
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
      nim: formData.nim,
      nama: formData.nama,
      faculty: formData.faculty,
      jurusan: formData.jurusan,
      password: formData.password,
    });
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("userName", formData.nama);
    localStorage.setItem("userNIM", formData.nim);
    
    setMessage({ text: "Registrasi berhasil! Silakan login.", type: "success" });
    setTimeout(() => navigate("/login"), 1500);
  };

  return (

    // Card atau kotak register
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
      <div className="relative bg-white rounded-2xl shadow-lg p-8 w-[400px] border-t-4 border-blue-500 z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register Student
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

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="nim"
            placeholder="NIM"
            value={formData.nim}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            value={formData.nama}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          {/* Dropdown fakultas */}
          <select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Pilih Fakultas</option>
            <option value="School of Computer Science">School of Computer Science</option>
            <option value="School of Information System">School of Information System</option>
            <option value="Faculty of Humanities">Faculty of Humanities</option>
            <option value="School of Design">School of Design</option>
            <option value="Business School">Business School</option>
            <option value="Faculty of Engineering">Faculty of Engineering</option>
            <option value="Faculty of Economics & Communication">Faculty of Economics & Communication</option>
          </select>

          <input
            type="text"
            name="jurusan"
            placeholder="Jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-500 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
