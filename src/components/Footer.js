import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-10 px-8 mt-auto">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
        <p className="mb-2">📍 Jl. K. H. Syahdan No. 9, Kemanggisan, Palmerah Jakarta 11480 Indonesia</p>
        <p className="mb-2">✉️ Email: fcc.apps@binus.edu</p>
        <p className="mb-7">📞 Telepon: +62 22 222 2222</p>

        <div className="flex justify-center gap-6 text-3xl mb-6">
          <a href="https://wa.me/6222222222222" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-transform transform hover:scale-110">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/asdahfsafdhj" target="_blank" rel="noopener noreferrer" className="hover:text-pink-700 transition-transform transform hover:scale-110">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/adhewrbbsdfbd" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-transform transform hover:scale-110">
            <FaFacebook />
          </a>
          <a href="https://www.linkedin.com/school/bsdfkjfneefefk/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-transform transform hover:scale-110">
            <FaLinkedin />
          </a>
        </div>

        <p className="text-sm text-gray-200 pt-4">
          © {new Date().getFullYear()} Friends Care Community | BINUS University
        </p>
      </div>
    </footer>
  );
}
