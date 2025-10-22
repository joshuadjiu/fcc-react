import React from "react";
import { Link, useLocation } from "react-router-dom";
import binusLogo from "../Assets/Logo-Binus.png";
import fccLogo from "../Assets/Logo-FCC.png";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-white shadow-md fixed w-full top-0 z-20">
      {/* 🔹 Logo Kiri */}
      <div className="flex items-center gap-4">
        <img
          src={binusLogo}
          alt="Binus Logo"
          className="w-14 h-14 object-contain"
        />
        <div className="w-[2px] h-10 bg-gray-300" />
        <div className="flex items-center gap-3">
          <img
            src={fccLogo}
            alt="FCC Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-lg font-bold text-gray-800">Friends Care Community</div>
        </div>
      </div>

      {/* 🔹 Menu Tengah */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link
          to="/"
          className={`hover:text-blue-600 ${
            location.pathname === "/" ? "text-blue-600 font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/articles"
          className={`hover:text-blue-600 ${
            location.pathname === "/articles" ? "text-blue-600 font-semibold" : ""
          }`}
        >
          Article
        </Link>
        <Link
          to="/documents"
          className={`hover:text-blue-600 ${
            location.pathname === "/documents" ? "text-blue-600 font-semibold" : ""
          }`}
        >
          Dokumentasi
        </Link>
      </div>

      {/* 🔹 Tombol Login & Register */}
      <div className="flex gap-3">
        <Link
          to="/login"
          className="px-4 py-2 bg-white text-black border border-black rounded-lg hover:bg-blue-200 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-white text-black border border-black rounded-lg hover:bg-blue-200 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
