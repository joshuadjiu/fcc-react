import React, { useState, useEffect } from "react";
import { Bell, User, CheckCircle } from "lucide-react";

export default function PeerPartner() {
  const [formData, setFormData] = useState({
    namaBuddy: "",
    tanggal: "",
    jamMulai: "",
    jamSelesai: "",
    durasi: 0,
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
  });
  const [riwayat, setRiwayat] = useState([]);
  const [buddyList, setBuddyList] = useState([]);

  // === Ambil data dari localStorage ===
  useEffect(() => {
    const savedBuddy = JSON.parse(localStorage.getItem("buddyData")) || [];
    const savedCounseling = JSON.parse(localStorage.getItem("peerCounselingData")) || [];
    setBuddyList(savedBuddy);
    setRiwayat(savedCounseling);
  }, []);

  // === Hitung durasi otomatis ===
  useEffect(() => {
    if (formData.jamMulai && formData.jamSelesai) {
      const [startH, startM] = formData.jamMulai.split(":").map(Number);
      const [endH, endM] = formData.jamSelesai.split(":").map(Number);
      const durasi = (endH * 60 + endM) - (startH * 60 + startM);
      setFormData((prev) => ({ ...prev, durasi: durasi > 0 ? durasi : 0 }));
    }
  }, [formData.jamMulai, formData.jamSelesai]);

  // === Fungsi untuk submit form konseling ===
  const handleSubmit = (e) => {
  e.preventDefault();

  // cari buddy yang sesuai dari list
  const selectedBuddy = buddyList.find((b) => b.nama === formData.namaBuddy);

  if (!selectedBuddy) {
    alert("Silakan pilih Data Buddy terlebih dahulu!");
    return;
  }

  // buat data baru dengan tambahan NIM & Jurusan
  const newEntry = {
    ...formData,
    nimBuddy: selectedBuddy.nim,
    jurusan: selectedBuddy.jurusan,
    verifikasi: false,
  };

  const updated = [...riwayat, newEntry];
  setRiwayat(updated);
  localStorage.setItem("peerCounselingData", JSON.stringify(updated));

  alert("Data konseling berhasil disimpan!");
  setFormData({
    namaBuddy: "",
    tanggal: "",
    jamMulai: "",
    jamSelesai: "",
    durasi: 0,
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
    });
  };

  // === Handle input ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Peer Partner</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="font-semibold text-blue-600">Input Konseling</li>
          <li className="font-semibold hover:text-blue-500 cursor-pointer">Riwayat Konseling</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        {/* Topbar */}
        <div className="flex justify-end items-center mb-8 space-x-6">
          <Bell className="text-gray-700 cursor-pointer" />
          <div className="flex items-center space-x-2">
            <User className="text-gray-700" />
            <div>
              <p className="font-semibold text-gray-800">Student Name</p>
              <p className="text-sm text-gray-600">NIM</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Input Data Konseling</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data Buddy</label>
              <select
                name="namaBuddy"
                value={formData.namaBuddy}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              >
                <option value="">-- Pilih Data Buddy --</option>
                {buddyList.map((b, i) => (
                  <option key={i} value={b.nama}>
                    {b.nama} - {b.nim} - {b.jurusan}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Konseling</label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Jam Mulai</label>
              <input
                type="time"
                name="jamMulai"
                value={formData.jamMulai}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Jam Selesai</label>
              <input
                type="time"
                name="jamSelesai"
                value={formData.jamSelesai}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Durasi: {formData.durasi} menit
          </p>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Metode Konseling</label>
            <select
              name="metode"
              value={formData.metode}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">-- Pilih Metode --</option>
              <option value="zoom">Zoom</option>
              <option value="tatap muka">Tatap Muka</option>
              <option value="chat">Chat WA/Line</option>
              <option value="telpon">Telepon</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Kegiatan</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              placeholder="Tuliskan hasil atau isi kegiatan konseling..."
            />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Kendala Saat Konseling
              </label>
              <input
                type="text"
                name="kendala"
                value={formData.kendala}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Support Needed
              </label>
              <input
                type="text"
                name="support"
                value={formData.support}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Simpan
            </button>
          </div>
        </form>

        {/* Riwayat Konseling */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Riwayat Konseling</h2>
          {riwayat.length === 0 ? (
            <p className="text-gray-500">Belum ada data konseling.</p>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">Nama</th>
                  <th className="py-2 px-3">Tanggal</th>
                  <th className="py-2 px-3">Durasi</th>
                  <th className="py-2 px-3">Metode</th>
                  <th className="py-2 px-3">Verifikasi</th>
                  <th className="py-2 px-3">Komentar Staff</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{r.namaBuddy}</td>
                    <td className="py-2 px-3">{r.tanggal}</td>
                    <td className="py-2 px-3">{r.durasi} menit</td>
                    <td className="py-2 px-3 capitalize">{r.metode}</td>
                    <td
                      className={`py-2 px-3 font-semibold ${
                        r.verifikasi ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {r.verifikasi ? "Disetujui" : "Menunggu"}
                    </td>
                    <td className="py-2 px-3">{r.komentarStaff || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
