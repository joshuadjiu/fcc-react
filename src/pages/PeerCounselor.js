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
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Mengambil data role diantara periode dan kampus, serta filter riwayat data logbook yang sesuai
  useEffect(() => {
    const savedRole = JSON.parse(localStorage.getItem("roleData"));
    const savedCounselor = JSON.parse(localStorage.getItem("counselorData")) || [];
    const saved = JSON.parse(localStorage.getItem("notifications")) || [];

    // Mengambil role sebelumnya
    const lastRole = JSON.parse(localStorage.getItem("lastRoleData"));

    // Mengecek perubahan periode atau kampus
    if (
      lastRole &&
      (lastRole.periode !== savedRole?.periode ||
        lastRole.kampus !== (savedRole?.kampus || savedRole?.campus))
    ) {
      localStorage.setItem("notifications", JSON.stringify([]));
      setNotifications([]);
    } else {
      setNotifications(saved);
    }

    if (savedRole) {
      localStorage.setItem("lastRoleData", JSON.stringify(savedRole));
      setRoleData(savedRole);
    }

    // Filter data yang sesuai dengan periode dan kampus
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

  // Durasi otomatis
  const hitungDurasi = () => {
    if (formData.jamMulai && formData.jamSelesai) {
      const mulai = new Date(`2025-01-01T${formData.jamMulai}`);
      const selesai = new Date(`2025-01-01T${formData.jamSelesai}`);
      const durasi = (selesai - mulai) / 60000;
      return durasi > 0 ? durasi : 0;
    }
    return 0;
  };

  // Handle perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    formData.status = "Menunggu";
    formData.verifikasi = false;
    formData.komentarStaff = "";

    // Validasi field
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

    const durasi = hitungDurasi();

    // Mengambil semua data user dalam peer counselor
    const allData = JSON.parse(localStorage.getItem("counselorData")) || [];
    const existing = JSON.parse(localStorage.getItem("peerCounselorData")) || [];

    // Melakukan filter edit dalam memperbarui/menghapus data lama berdasarkan NIM dan tanggal yang sama
    const filteredExisting = existing.filter(
      (item) =>
        !(
          item.nimBuddy === formData.nimBuddy &&
          item.tanggal === formData.tanggal
        )
    );

    // Entry baru untuk data counselor (dipakai oleh SASC Staff)
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
      status: "Menunggu",
    };

    // Mengedit ulang, jika data dalam NIM dan tanggal sudah ada di data counselor
    const existingIndex = allData.findIndex(
      (item) =>
        item.nim === newEntry.nim && item.tanggalKonseling === newEntry.tanggalKonseling
    );

    // Data sudah ada -> user melakukan edit, sedangkan Data belum ada -> menambahkan data baru
    if (existingIndex !== -1) {
      allData[existingIndex] = newEntry;
    } else {
      allData.push(newEntry);
    }

    // Menyimpan ke localStorage
    filteredExisting.push(formData);
    localStorage.setItem("peerCounselorData", JSON.stringify(filteredExisting));
    localStorage.setItem("counselorData", JSON.stringify(allData));

    // Filter update otomatis pada tampilan melalui riwayat data
    const filtered = allData.filter(
      (item) =>
        item.periode === roleData.periode &&
        item.kampus === (roleData.kampus || roleData.campus)
    );
    setRiwayat(filtered);

    alert("Data logbook berhasil disimpan!");

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
  };

  const navigate = useNavigate();

  const handleViewAll = () => {
   navigate("/notifications");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleEdit = (index) => {
    const selected = riwayat[index];
    if (!selected) return;

    // Mengisi kembali form dengan data lama
    setFormData({
      nimBuddy: selected.nim,
      namaBuddy: selected.nama,
      jurusan: selected.jurusan,
      tanggal: selected.tanggalKonseling,
      jamMulai: selected.jamMulai,
      jamSelesai: selected.jamSelesai,
      metode: selected.metode,
      deskripsi: selected.deskripsi,
      kendala: selected.kendala,
      support: selected.supportNeeded,
    });

    // Menghapus sementara dari localStorage agar tidak double atau menambah data baru saat disubmit lagi
    const allData = JSON.parse(localStorage.getItem("counselorData")) || [];
    allData.splice(index, 1);
    localStorage.setItem("counselorData", JSON.stringify(allData));

    alert("Silakan ubah data dan klik Simpan untuk memperbarui logbook.");
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
        <div className="flex justify-between items-center mb-8 w-full">
          
          {/* Tombol kembali */}
          <button
            onClick={() => navigate("/role-selection")}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            ← Kembali
          </button>

          <div className="flex items-center space-x-6">
            
            {/* Notifikasi */}
            <div
              className="relative flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-300 transition"
              onClick={toggleDropdown}
            >
              <Bell className="text-gray-700 cursor-pointer" />

              {showDropdown && (
                <div className="absolute right-0 top-12 w-64 bg-white border rounded-lg shadow-lg z-20">
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

            {/* Profile */}
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

              {/* Tombol logout */}
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-900 transition text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Informasi kampus dan periode */}
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
          Logbook Kegiatan
        </h1>

        {/* Input logbook kegiatan */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mb-8"
        >
          <div className="mb-4">
            <label className="font-medium">NIM</label>
            <input
              type="text"
              name="nimBuddy"
              value={formData.nimBuddy}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="font-medium">Nama</label>
            <input
              type="text"
              name="namaBuddy"
              value={formData.namaBuddy}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="font-medium">Jurusan</label>
            <input
              type="text"
              name="jurusan"
              value={formData.jurusan}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="font-medium">Metode Konseling</label>
            <select
              name="metode"
              value={formData.metode}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">-- Pilih Metode --</option>
              <option value="Zoom">Zoom</option>
              <option value="Tatap Muka">Tatap Muka</option>
              <option value="chat WA/Line">Chat WA/Line</option>
              <option value="Telepon">Telepon</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="font-medium">Deskripsi Kegiatan</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="Isi kegiatan konseling..."
            />
          </div>

          <div className="mb-4">
            <label className="font-medium">Kendala Saat Konseling</label>
            <textarea
              name="kendala"
              value={formData.kendala}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <div className="mb-4">
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

        {/* Riwayat data logbook */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Data Logbook</h2>
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
                  <th className="py-2 px-3 text-center">Aksi</th>
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
                            : item.status === "Decline"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status || "Menunggu"}
                      </span>
                    </td>
                    <td className="py-2 px-3">{item.komentarStaff || "-"}</td>
                    <td className="py-2 px-3 text-center">
                      {(item.status === "Menunggu" || item.status === "Decline") && (
                        <button
                          onClick={() => handleEdit(i)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                      )}
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
