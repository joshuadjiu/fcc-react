import React, { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom"

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

  const [riwayat, setRiwayat] = useState([]);
  const [roleData, setRoleData] = useState({});
  const [notifications, setNotifications] = useState([]); // 🔹 pindahkan ke sini
  const [showDropdown, setShowDropdown] = useState(false); // 🔹 pindahkan juga

  // 🔹 Ambil data role (periode & kampus) dan filter riwayat sesuai
  useEffect(() => {
    const savedRole = JSON.parse(localStorage.getItem("roleData"));
    const savedCounselor = JSON.parse(localStorage.getItem("counselorData")) || [];
    const saved = JSON.parse(localStorage.getItem("notifications")) || [];

    // Ambil role sebelumnya
    const lastRole = JSON.parse(localStorage.getItem("lastRoleData"));

    // Cek apakah periode/kampus berubah
    if (
      lastRole &&
      (lastRole.periode !== savedRole?.periode ||
        lastRole.kampus !== (savedRole?.kampus || savedRole?.campus))
    ) {
      // Jika berubah, kosongkan notifikasi
      localStorage.setItem("notifications", JSON.stringify([]));
      setNotifications([]);
    } else {
      setNotifications(saved);
    }

    // Simpan role sekarang sebagai role terakhir
    if (savedRole) {
      localStorage.setItem("lastRoleData", JSON.stringify(savedRole));
      setRoleData(savedRole);
    }

    // 🔹 Filter hanya data yang sesuai periode & kampus
    if (savedRole) {
      const filtered = savedCounselor.filter(
        (item) =>
          item.periode === savedRole.periode &&
          item.kampus === (savedRole.campus || savedRole.kampus)
      );
      setRiwayat(filtered);
    } else {
      setRiwayat(savedCounselor);
    }
  }, []);

  // 🔹 Hitung durasi otomatis
  const hitungDurasi = () => {
    if (formData.jamMulai && formData.jamSelesai) {
      const mulai = new Date(`2025-01-01T${formData.jamMulai}`);
      const selesai = new Date(`2025-01-01T${formData.jamSelesai}`);
      const durasi = (selesai - mulai) / 60000;
      return durasi > 0 ? durasi : 0;
    }
    return 0;
  };

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // simpan data form ke localStorage
    const existing = JSON.parse(localStorage.getItem("peerCounselorData")) || [];
    existing.push(formData);
    localStorage.setItem("peerCounselorData", JSON.stringify(existing));

    // tambahkan notifikasi otomatis
    const newNotif = {
      message: "Form Peer Counselor berhasil dikirim!",
      date: new Date().toLocaleString(),
    };

    const saved = JSON.parse(localStorage.getItem("notifications")) || [];
    saved.push(newNotif);
    localStorage.setItem("notifications", JSON.stringify(saved));
    setNotifications(saved);

    const durasi = hitungDurasi();
    const requiredFields = [
      "nimBuddy",
      "namaBuddy",
      "jurusan",
      "tanggal",
      "jamMulai",
      "jamSelesai",
      "metode",
      "deskripsi",
      "kendala",
      "support",
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (emptyFields.length > 0) {
      alert("Harap isi semua kolom!");
      return;
    }

    // 🔹 Ambil semua data counselor di localStorage
    const allData = JSON.parse(localStorage.getItem("counselorData")) || [];

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
      periode: roleData.periode || "-",
      kampus: roleData.kampus || roleData.campus || "-",
    };

    // 🔹 Simpan ke localStorage (tanpa filter, agar SASC Staff bisa lihat semua)
    const updatedAll = [...allData, newEntry];
    localStorage.setItem("counselorData", JSON.stringify(updatedAll));

    // 🔹 Perbarui tampilan hanya dengan data sesuai periode & kampus aktif
    const filtered = updatedAll.filter(
      (item) =>
        item.periode === roleData.periode &&
        item.kampus === (roleData.kampus || roleData.campus)
    );
    setRiwayat(filtered);

    alert("Form data peer counselor berhasil disimpan");

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
  };

  const navigate = useNavigate();

  const handleViewAll = () => {
   navigate("/notifications"); // arahkan ke halaman baru
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Peer Counselor</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="font-semibold text-blue-600">Dashboard</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        {/* Topbar */}
        <div className="flex justify-end items-center mb-8 space-x-6">
          <div className="relative">
            <Bell
              className="text-gray-700 cursor-pointer"
              onClick={toggleDropdown}
            />
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-20">
                <div className="px-4 py-2 border-b font-semibold text-gray-700">
                  Notification
                </div>

                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-500 text-sm">
                    No New Notification
                  </div>
                ) : (
                  notifications.map((notif, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {notif.message}
                    </div>
                  ))
                )}

                <button
                  onClick={handleViewAll}
                  className="w-full text-center text-blue-600 py-2 border-t hover:bg-gray-50 text-sm font-medium"
                >
                  VIEW ALL
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <User className="text-gray-700" />
            <div>
              <p className="font-semibold text-gray-800">
                {localStorage.getItem("userName") || "Nama"}
              </p>
              <p className="text-sm text-gray-600">
                {localStorage.getItem("userNIM") || "NIM"}
              </p>
            </div>
          </div>
        </div>

        {/* Info Kampus & Periode */}
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

        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Isi Form Data Peer Counselor
        </h1>

        {/* Form Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow space-y-5 max-w-3xl"
        >
          <div>
            <label className="font-medium">NIM</label>
            <input
              type="text"
              name="nimBuddy"
              value={formData.nimBuddy}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
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
              placeholder="Isi kegiatan konseling..."
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

        {/* Riwayat */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Riwayat Form Peer Counselor</h2>
          <div className="bg-white p-5 rounded-xl shadow overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">NIM</th>
                  <th className="py-2 px-3">Nama</th>
                  <th className="py-2 px-3">Jurusan</th>
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
                    <td className="py-2 px-3">{item.nim}</td>
                    <td className="py-2 px-3">{item.nama}</td>
                    <td className="py-2 px-3">{item.jurusan}</td>
                    <td className="py-2 px-3">{item.tanggalKonseling}</td>
                    <td className="py-2 px-3">{item.jamMulai}</td>
                    <td className="py-2 px-3">{item.jamSelesai}</td>
                    <td className="py-2 px-3">{item.durasi} menit</td>
                    <td className="py-2 px-3 capitalize">{item.metode}</td>
                    <td className="py-2 px-3">{item.deskripsi}</td>
                    <td className="py-2 px-3">{item.kendala}</td>
                    <td className="py-2 px-3">{item.supportNeeded}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Disetujui"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Tidak Disetujui"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status || "Menunggu"}
                      </span>
                    </td>
                    <td className="py-2 px-3">{item.komentarStaff || "-"}</td>
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
