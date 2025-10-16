import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    password: "",
    faculty: "",
    jurusan: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(form.nim, JSON.stringify(form));
    alert("Registrasi berhasil! Silakan login.");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Registrasi FCC</h2>
      <form onSubmit={handleSubmit}>
        <input id="nim" placeholder="NIM" onChange={handleChange} required />
        <input id="nama" placeholder="Nama Lengkap" onChange={handleChange} required />
        <input id="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select id="faculty" onChange={handleChange} required>
          <option value="">Pilih Fakultas</option>
          <option>Computer Science</option>
          <option>Business</option>
          <option>Design</option>
          <option>Communication</option>
        </select>
        <input id="jurusan" placeholder="Jurusan" onChange={handleChange} required />
        <button type="submit">Daftar</button>
        <p>Sudah punya akun? <a href="/">Login</a></p>
      </form>
    </div>
  );
}
