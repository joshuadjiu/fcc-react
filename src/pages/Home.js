import React from "react";
import { Link } from "react-router-dom";
import binusLogo from "../Assets/Logo-Binus.png"; // versi PNG tanpa kotak
import fccLogo from "../Assets/Logo-FCC.png"; // pastikan file ada
import temanNgumpul from "../Assets/Teman-Ngumpul.jpg";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 🔹 Navbar */}
      <Navbar /> {/* ⬅️ panggil Navbar */}

      {/* 🔹 Konten utama */}
      <main
        className="flex-grow relative text-white pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${temanNgumpul})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay konten */}
        <div className="flex flex-col items-center justify-center text-center p-6 min-h-[80vh]">
          <h1 className="text-5xl font-bold mb-3">Welcome to FCC</h1>
          <p className="text-lg text-gray-200 max-w-xl">
            Platform dokumentasi, artikel, dan proses kerja FCC Binus University.
          </p>
        </div>

        {/* 🔹 Articles */}
        <section className="bg-white text-gray-800 py-16 px-6">
          <h2 className="text-2xl font-semibold text-center mb-8 text-black">
            Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">
                Pelatihan Internal FCC 2025
              </h3>
              <p>
                Kegiatan pelatihan internal dalam meningkatkan kemampuan tim FCC.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">
                Kolaborasi dengan Binus Support
              </h3>
              <p>
                Proses kerja sama FCC dalam meningkatkan sistem dukungan mahasiswa.
              </p>
            </div>
          </div>
        </section>

        {/* 🔹 Dokumentasi */}
        <section className="bg-gradient-to-b from-cyan-500 to-indigo-700 text-yellow-500 py-16 px-6">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Dokumentasi Proses Kerja FCC
          </h2>
          <p className="text-center max-w-3xl mx-auto">
            Dokumentasi berbagai kegiatan, rapat, dan kolaborasi antar tim yang
            dilakukan oleh FCC.
          </p>
        </section>
      </main>
    </div>
  );
}
