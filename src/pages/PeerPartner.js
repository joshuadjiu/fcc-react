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
  const [roleData, setRoleData] = useState({}); // 🔹 untuk ambil periode & kampus

  // === Ambil data dari localStorage ===
  useEffect(() => {
    const savedBuddy = JSON.parse(localStorage.getItem("buddyData")) || [];
    const savedPartner = JSON.parse(localStorage.getItem("partnerData")) || [];
    const savedRole = JSON.parse(localStorage.getItem("roleData"));

    if (savedRole) setRoleData(savedRole);

    // 🔹 Filter riwayat sesuai periode & kampus
    if (savedRole) {
      const filtered = savedPartner.filter(
        (item) =>
          item.periode === savedRole.periode &&
          item.kampus === (savedRole.kampus || savedRole.campus)
      );
      setRiwayat(filtered);
    } else {
      setRiwayat(savedPartner);
    }

    setBuddyList(savedBuddy);
  }, []);

  // === Hitung durasi otomatis ===
  useEffect(() => {
    if (formData.jamMulai && formData.jamSelesai) {
      const [startH, startM] = formData.jamMulai.split(":").map(Number);
      const [endH, endM] = formData.jamSelesai.split(":").map(Number);
      const durasi = endH * 60 + endM - (startH * 60 + startM);
      setFormData((prev) => ({ ...prev, durasi: durasi > 0 ? durasi : 0 }));
    }
  }, [formData.jamMulai, formData.jamSelesai]);

  // === Submit form ===
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "namaBuddy",
      "tanggal",
      "jamMulai",
      "jamSelesai",
      "metode",
      "deskripsi",
      "kendala",
      "support",
    ];
    const emptyFields = requiredFields.filter((f) => !formData[f]);
    if (emptyFields.length > 0) {
      alert("Harap isi semua kolom!");
      return;
    }

    const selectedBuddy = buddyList.find((b) => b.nama === formData.namaBuddy);

    const newEntry = {
      ...formData,
      nimBuddy: selectedBuddy?.nim || "-",
      jurusan: selectedBuddy?.jurusan || "-",
      verifikasi: false,
      komentarStaff: "",
      periode: roleData.periode || "-", // 🔹 simpan periode
      kampus: roleData.kampus || roleData.campus || "-", // 🔹 simpan kampus
    };

    // Tambahkan ke data lama
    const existing = JSON.parse(localStorage.getItem("partnerData")) || [];
    const updated = [...existing, newEntry];

    localStorage.setItem("partnerData", JSON.stringify(updated));
    setRiwayat(updated.filter(
      (item) =>
        item.periode === roleData.periode &&
        item.kampus === (roleData.kampus || roleData.campus)
    ));

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
          <li className="font-semibold text-blue-600">Dashboard</li>
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
              <p className="font-semibold text-gray-800">Nama</p>
              <p className="text-sm text-gray-600">NIM</p>
            </div>
          </div>
        </div>

        {/* 🔹 Info Kampus & Periode */}
        {roleData && (
          <div className="mb-6 p-3 rounded-lg bg-blue-100 border border-blue-300 max-w-lg">
            <p className="font-semibold text-gray-800">
              Periode:{" "}
              <span className="font-normal">{roleData.periode || "-"}</span>
            </p>
            <p className="font-semibold text-gray-800">
              Kampus:{" "}
              <span className="font-normal">
                {roleData.kampus || roleData.campus || "Tidak ada data kampus"}
              </span>
            </p>
          </div>
        )}

        {/* Input Form */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Isi Form Data Peer Partner
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data Buddy
              </label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tanggal Konseling
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Jam Mulai
              </label>
              <input
                type="time"
                name="jamMulai"
                value={formData.jamMulai}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Jam Selesai
              </label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Metode Konseling
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Deskripsi Kegiatan
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              placeholder="Tuliskan kegiatan konseling..."
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
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Riwayat Form Peer Partner
          </h2>
          {riwayat.length === 0 ? (
            <p className="text-gray-500">Belum ada data konseling.</p>
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">Nama</th>
                  <th className="py-2 px-3">Tanggal Konseling</th>
                  <th className="py-2 px-3">Jam Mulai</th>
                  <th className="py-2 px-3">Jam Selesai</th>
                  <th className="py-2 px-3">Durasi</th>
                  <th className="py-2 px-3">Metode</th>
                  <th className="py-2 px-3">Deskripsi Kegiatan</th>
                  <th className="py-2 px-3">Kendala Konseling</th>
                  <th className="py-2 px-3">Support Needed</th>
                  <th className="py-2 px-3">Status Verifikasi</th>
                  <th className="py-2 px-3">Komentar</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{item.nama || item.namaBuddy}</td>
                    <td className="py-2 px-3">
                      {item.tanggalKonseling || item.tanggal}
                    </td>
                    <td className="py-2 px-3">{item.jamMulai}</td>
                    <td className="py-2 px-3">{item.jamSelesai}</td>
                    <td className="py-2 px-3">{item.durasi} menit</td>
                    <td className="py-2 px-3 capitalize">{item.metode}</td>
                    <td className="py-2 px-3">{item.deskripsi}</td>
                    <td className="py-2 px-3">{item.kendala}</td>
                    <td className="py-2 px-3">
                      {item.supportNeeded || item.support}
                    </td>
                    <td
                      className={`py-2 px-3 font-semibold ${
                        item.verifikasi ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {item.verifikasi ? "Disetujui" : "Menunggu"}
                    </td>
                    <td className="py-2 px-3">{item.komentarStaff || "-"}</td>
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
