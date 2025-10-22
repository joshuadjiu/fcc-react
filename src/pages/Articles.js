import React from "react";
import Navbar from "../components/Navbar"; // ✅ Tambahkan Navbar biar seragam

export default function Articles() {
  const articles = [
    {
      title: "Pelatihan Internal FCC 2025",
      desc: "Pelatihan rutin untuk meningkatkan kemampuan tim FCC dalam bidang teknis dan manajerial.",
    },
    {
      title: "Kolaborasi dengan Binus Support",
      desc: "Kerja sama dengan Binus Support untuk meningkatkan sistem dukungan mahasiswa.",
    },
    {
      title: "Penerapan Sistem Dokumentasi Terintegrasi",
      desc: "Inovasi baru FCC dalam menyatukan seluruh dokumentasi ke dalam satu portal modern.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ✅ Navbar di atas */}
      <Navbar />

      {/* 🔹 Konten utama */}
      <main className="pt-24 pb-16 px-6 mt-16">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
          FCC Articles
        </h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
              <p className="text-gray-700">{article.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
