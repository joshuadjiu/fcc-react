import React from "react";
import Navbar from "../components/Navbar"; // ✅ Tambahkan Navbar di atas

export default function Documents() {
  const steps = [
    { step: "1", title: "Perencanaan", desc: "Menentukan tujuan dan pembagian tugas anggota FCC." },
    { step: "2", title: "Pengembangan", desc: "Membangun sistem sesuai kebutuhan dan spesifikasi proyek." },
    { step: "3", title: "Testing", desc: "Melakukan uji coba sistem untuk memastikan stabilitas dan performa." },
    { step: "4", title: "Publikasi", desc: "Menyebarkan hasil proyek ke publik dan melakukan dokumentasi akhir." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* 🔹 Konten utama */}
      <section className="py-24 px-8 text-center bg-gradient-to-b from-indigo-600 to-purple-700 text-white mt-16">
        <h2 className="text-3xl font-bold mb-10">Dokumentasi Proses Kerja FCC</h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-sm hover:bg-white/20 transition duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-200">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
