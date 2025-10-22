import React from "react";
import { Link } from "react-router-dom";
import binusLogo from "../Assets/Logo-Binus.png"; // logo binus tanpa background kotak
import fccLogo from "../Assets/Logo-FCC.png"; // logo FCC
import temanNgumpul from "../Assets/Teman-Ngumpul.jpg";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 🔹 Navbar */}
      <Navbar />

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
        {/* 🔹 Logo FCC & Binus */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-8 items-center">
          <img
            src={binusLogo}
            alt="Binus Logo"
            className="h-14 w-auto drop-shadow-lg"
          />
          <img
            src={fccLogo}
            alt="FCC Logo"
            className="h-14 w-auto drop-shadow-lg"
          />
        </div>

        {/* 🔹 Hero Section */}
        <div className="flex flex-col items-center justify-center text-center p-6 min-h-[80vh]">
          <h1 className="text-5xl font-bold mb-3">Welcome to FCC</h1>
          <p className="text-lg text-gray-200 max-w-xl">
            Platform dokumentasi, artikel, dan proses kerja FCC Binus University.
          </p>
        </div>

        {/* 🔹 Articles Section */}
        <section className="bg-white text-gray-800 py-16 px-6">
          <h2 className="text-2xl font-semibold text-center mb-8 text-black">
            Articles
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* 🔸 Artikel 1 */}
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Pelatihan Internal FCC 2025
                </h3>
                <p className="mb-4">
                  Kegiatan pelatihan internal dalam meningkatkan kemampuan tim FCC.
                </p>
              </div>
              <Link
                to="/articles"
                className="self-start mt-auto bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                Lihat Selengkapnya
              </Link>
            </div>

            {/* 🔸 Artikel 2 */}
            <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Kolaborasi dengan Binus Support
                </h3>
                <p className="mb-4">
                  Proses kerja sama FCC dalam meningkatkan sistem dukungan mahasiswa.
                </p>
              </div>
              <Link
                to="/articles"
                className="self-start mt-auto bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                Lihat Selengkapnya
              </Link>
            </div>
          </div>
        </section>

        {/* 🔹 Dokumentasi Section */}
        <section className="bg-gradient-to-b from-cyan-500 to-indigo-700 text-yellow-400 py-16 px-6">
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
