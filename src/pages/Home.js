import React from "react";
import { Link } from "react-router-dom";
// import binusLogo from "../Assets/Logo-Binus.png";
// import fccLogo from "../Assets/Logo-FCC.png";
import temanNgumpul from "../Assets/Teman-Ngumpul.jpg";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Backgroud slogan */}
      <main
        className="flex-grow relative text-white pt-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${temanNgumpul})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        {/* Slogan */}
        <div className="flex flex-col items-center justify-center text-center p-6 min-h-[80vh]">
          <h1 className="text-5xl font-bold mb-3">Welcome to FCC</h1>
          <p className="text-lg text-gray-100 max-w-xl">
            Together We Care, Together We Grow
          </p>
        </div>
      </main>

      {/* Articles di halaman Home */}
      <section className="bg-white text-gray-800 py-16 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">Articles</h2>

        <div className="flex gap-6 overflow-x-auto pb-4 px-2">
          {[
            {
              title: "Pelatihan Internal FCC 2025",
              desc: "Kegiatan pelatihan internal dalam meningkatkan kemampuan tim FCC.",
              img: temanNgumpul,
            },
            {
              title: "Kolaborasi dengan Binus Support",
              desc: "Proses kerja sama FCC dalam meningkatkan sistem dukungan mahasiswa.",
              img: temanNgumpul,
            },
            {
              title: "Workshop Leadership FCC",
              desc: "Kegiatan pengembangan soft skill dan kepemimpinan anggota FCC.",
              img: temanNgumpul,
            },
            {
              title: "Event FCC & Student Clubs",
              desc: "Kolaborasi antar organisasi dalam menciptakan komunitas yang inklusif.",
              img: temanNgumpul,
            },
            {
              title: "Event FCC & Student Clubs",
              desc: "Kolaborasi antar organisasi dalam menciptakan komunitas yang inklusif.",
              img: temanNgumpul,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-gray-100 rounded-xl shadow hover:shadow-lg transition flex-shrink-0"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-40 w-full object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col justify-between h-[180px]">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <Link
                  to="/articles"
                  className="mt-4 bg-yellow-400 text-black font-semibold px-3 py-1.5 rounded-lg hover:bg-yellow-300 transition self-start"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dokumentasi di halaman Home */}
      <section className="bg-gradient-to-b from-cyan-500 text-yellow-400 py-16 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Dokumentasi Proses Kerja
        </h2>

        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Rapat Koordinasi Mingguan",
              desc: "Kegiatan rutin FCC dalam menyusun strategi kerja mingguan.",
              img: temanNgumpul,
            },
            {
              title: "Diskusi Ide Proyek",
              desc: "Tim FCC berdiskusi untuk merancang proyek-proyek kreatif.",
              img: temanNgumpul,
            },
            {
              title: "Kegiatan Sosialisasi",
              desc: "Sesi berbagi pengalaman antar anggota FCC dan mahasiswa.",
              img: temanNgumpul,
            },
          ].map((doc, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden w-full"
            >
              <img src={doc.img} alt={doc.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                <p className="text-gray-700">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
