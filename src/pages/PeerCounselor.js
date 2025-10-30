// 📁 src/pages/PeerCounselor.js
import React, { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";

export default function PeerCounselor() {
  const [formData, setFormData] = useState({
    nimBuddy: "",
    namaBuddy: "",
    jurusan: "",
    tanggal: "",
    jamMulai: "",
    jamSelesai: "",
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
  });

  const [errors, setErrors] = useState({});
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("peerCounselingData")) || [];
    setRiwayat(savedData);
  }, []);

  const profile = JSON.parse(localStorage.getItem("registerData")) || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hitungDurasi = () => {
    if (formData.jamMulai && formData.jamSelesai) {
      const mulai = new Date(`2025-01-01T${formData.jamMulai}`);
      const selesai = new Date(`2025-01-01T${formData.jamSelesai}`);
      const durasi = (selesai - mulai) / 60000;
      return durasi > 0 ? durasi : 0;
    }
    return 0;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "Wajib diisi";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const durasi = hitungDurasi();

    // ✅ Samakan key dengan yang digunakan di halaman Staff
    const newEntry = {
      nim: formData.nimBuddy,
      nama: formData.namaBuddy,
      jurusan: formData.jurusan,
      tanggalKonseling: formData.tanggal,
      jamMulai: formData.jamMulai,
      jamSelesai: formData.jamSelesai,
      durasi,
      metode: formData.metode,
      deskripsi: formData.deskripsi,
      kendala: formData.kendala,
      supportNeeded: formData.support,
      verifikasi: false,
      komentarStaff: "",
    };

    const updatedData = [...riwayat, newEntry];
    setRiwayat(updatedData);
    localStorage.setItem("peerCounselingData", JSON.stringify(updatedData));

    // Reset form
    setFormData({
      nimBuddy: "",
      namaBuddy: "",
      jurusan: "",
      tanggal: "",
      jamMulai: "",
      jamSelesai: "",
      metode: "",
      deskripsi: "",
      kendala: "",
      support: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          Peer Counselor
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="hover:text-blue-500 cursor-pointer font-semibold">Dashboard</li>
          <li className="hover:text-blue-500 cursor-pointer">Input Konseling</li>
          <li className="hover:text-blue-500 cursor-pointer">Riwayat Konseling</li>
        </ul>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 p-10">
        {/* Topbar */}
        <div className="flex justify-end items-center mb-8 space-x-6">
          <Bell className="text-gray-700 cursor-pointer" />
          <div className="flex items-center space-x-2">
            <User className="text-gray-700" />
            <div>
              <p className="font-semibold text-gray-800">
                {profile.nama || "Student Name"}
              </p>
              <p className="text-sm text-gray-600">
                {profile.nim || "NIM"}
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Input Data Konseling
        </h1>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow space-y-5 max-w-3xl"
        >
          {/* 🔹 Field-field input (sama seperti versi sebelumnya) */}
          {/* (tidak dihapus, tetap sama) */}

          <div>
            <label className="font-medium">NIM</label>
            <input
              type="text"
              name="nimBuddy"
              value={formData.nimBuddy}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            {errors.nimBuddy && <p className="text-red-500 text-sm">{errors.nimBuddy}</p>}
          </div>

          <div>
            <label className="font-medium">Nama</label>
            <input
              type="text"
              name="namaBuddy"
              value={formData.namaBuddy}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            {errors.namaBuddy && <p className="text-red-500 text-sm">{errors.namaBuddy}</p>}
          </div>

          <div>
            <label className="font-medium">Jurusan</label>
            <input
              type="text"
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            {errors.jurusan && <p className="text-red-500 text-sm">{errors.jurusan}</p>}
          </div>

          <div>
            <label className="font-medium">Tanggal Konseling</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            {errors.tanggal && <p className="text-red-500 text-sm">{errors.tanggal}</p>}
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="font-medium">Jam Mulai</label>
              <input
                type="time"
                name="jamMulai"
                value={formData.jamMulai}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="font-medium">Jam Selesai</label>
              <input
                type="time"
                name="jamSelesai"
                value={formData.jamSelesai}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>

          <p className="text-gray-700 text-sm">
            Durasi: <span className="font-semibold">{hitungDurasi()} menit</span>
          </p>

          <div>
            <label className="font-medium">Metode Konseling</label>
            <select
              name="metode"
              value={formData.metode}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">-- Pilih Metode --</option>
              <option value="zoom">Zoom</option>
              <option value="tatap muka">Tatap Muka</option>
              <option value="chat">Chat WA/Line</option>
              <option value="telpon">Telepon</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Deskripsi Kegiatan</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium">Kendala Saat Konseling</label>
            <textarea
              name="kendala"
              value={formData.kendala}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium">Support Needed</label>
            <textarea
              name="support"
              value={formData.support}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Simpan
          </button>
        </form>

        {/* 🔹 Riwayat Konseling + Verifikasi */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Riwayat Konseling</h2>
          <div className="bg-white p-5 rounded-xl shadow overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">Nama Buddy</th>
                  <th className="py-2 px-3">Tanggal</th>
                  <th className="py-2 px-3">Durasi</th>
                  <th className="py-2 px-3">Metode</th>
                  <th className="py-2 px-3">Verifikasi</th>
                  <th className="py-2 px-3">Komentar Staff</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{item.namaBuddy}</td>
                    <td className="py-2 px-3">{item.tanggal}</td>
                    <td className="py-2 px-3">{item.durasi} menit</td>
                    <td className="py-2 px-3 capitalize">{item.metode}</td>
                    <td className="py-2 px-3">
                      {item.verifikasi ? (
                        <span className="text-green-600 font-semibold">Disetujui</span>
                      ) : (
                        <span className="text-yellow-600">Menunggu</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {item.komentarStaff || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
