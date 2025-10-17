import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem(nim));
    if (user && user.password === password) {
      alert("Login berhasil!");
      navigate("/dashboard");
    } else {
      alert("NIM atau password salah!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Friends Care Community</h2>
        <h3 className="subtitle">Masuk ke Akun Anda</h3>

        <form onSubmit={handleLogin} className="login-form">
          <input
            className="input-field"
            placeholder="Masukkan NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-login">
            Masuk
          </button>
          <p className="register-text">
            Belum punya akun?{" "}
            <a href="/register" className="register-link">
              Daftar di sini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
