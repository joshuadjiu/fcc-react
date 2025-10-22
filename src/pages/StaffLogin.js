import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginStaff() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleStaffLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Semua field harus diisi!");
      return;
    }

    // contoh kredensial staff
    if (username === "sascadmin" && password === "admin123") {
      navigate("/staff-dashboard");
    } else {
      setError("NIM atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login SASC Staff</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleStaffLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">NIM</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
          >
            Login Staff
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Kembali ke Login Mahasiswa
          </Link>
        </p>
      </div>
    </div>
  );
}
