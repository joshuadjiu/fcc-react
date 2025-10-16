import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

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
    <div className="container">
      <h2>Friends Care Community</h2>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input placeholder="NIM" value={nim} onChange={(e) => setNim(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Masuk</button>
        <p>Belum punya akun? <a href="/register">Daftar di sini</a></p>
      </form>
    </div>
  );
}
