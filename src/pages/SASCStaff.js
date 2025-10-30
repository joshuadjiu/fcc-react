import React, { useEffect, useState } from "react";
import { Bell, User, CheckCircle, PlusCircle } from "lucide-react";

export default function SASCStaff() {
  const [activePage, setActivePage] = useState("verifikasi");
  const [riwayat, setRiwayat] = useState(
    JSON.parse(localStorage.getItem("peerCounselingData")) || []
);

  const [dataKonseling, setDataKonseling] = useState([]);
  const [dataBuddy, setDataBuddy] = useState([]);
  const [dataCreative, setDataCreative] = useState([]);
  const [formBuddy, setFormBuddy] = useState({ nim: "", nama: "", jurusan: "" });

  // ======== LOAD DATA DARI LOCALSTORAGE ========
  useEffect(() => {
    const savedKonseling = JSON.parse(localStorage.getItem("peerCounselingData")) || [];
    const savedBuddy = JSON.parse(localStorage.getItem("buddyData")) || [];
    const savedCreative = JSON.parse(localStorage.getItem("creativeData")) || [];
    setDataKonseling(savedKonseling);
    setDataBuddy(savedBuddy);
    setDataCreative(savedCreative);
  }, []);

  // ======== FUNGSI VERIFIKASI KONSELING ========
  const handleVerifikasiChange = (index) => {
    const updated = [...dataKonseling];
    updated[index].verifikasi = !updated[index].verifikasi;
    setDataKonseling(updated);
    localStorage.setItem("peerCounselingData", JSON.stringify(updated));
  };

  const handleKomentarChange = (index, value) => {
    const updated = [...dataKonseling];
    updated[index].komentarStaff = value;
    setDataKonseling(updated);
    localStorage.setItem("peerCounselingData", JSON.stringify(updated));
  };

  const updateVerifikasi = (index, statusType) => {
    const updatedData = [...riwayat];
    if (statusType === "setuju") {
      updatedData[index].verifikasi = true;
      updatedData[index].status = "Disetujui";
    } else if (statusType === "tidak") {
      updatedData[index].verifikasi = false;
      updatedData[index].status = "Tidak Disetujui";
    }
    setRiwayat(updatedData);
    localStorage.setItem("peerCounselingData", JSON.stringify(updatedData));
  };

  // ======== FUNGSI VERIFIKASI CREATIVE TEAM ========
  const handleVerifikasiCreative = (index) => {
    const updated = [...dataCreative];
    updated[index].verifikasi = !updated[index].verifikasi;
    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));
  };

  const handleKomentarCreative = (index, value) => {
    const updated = [...dataCreative];
    updated[index].komentarStaff = value;
    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));
  };

  // ======== FUNGSI INPUT BUDDY ========
  const handleBuddyChange = (e) => {
    const { name, value } = e.target;
    setFormBuddy({ ...formBuddy, [name]: value });
  };

  const handleAddBuddy = (e) => {
    e.preventDefault();
    if (!formBuddy.nim || !formBuddy.nama || !formBuddy.jurusan) {
      alert("Harap isi semua kolom!");
      return;
    }
    const updated = [...dataBuddy, formBuddy];
    setDataBuddy(updated);
    localStorage.setItem("buddyData", JSON.stringify(updated));
    setFormBuddy({ nim: "", nama: "", jurusan: "" });
    alert("Data buddy berhasil ditambahkan!");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">SASC Staff</h2>
        <ul className="space-y-3 text-gray-700">
          <li
            onClick={() => setActivePage("buddy")}
            className={`cursor-pointer font-semibold ${
              activePage === "buddy" ? "text-blue-600" : "hover:text-blue-500"
            }`}
          >
            Input Data Buddy
          </li>
          <li
            onClick={() => setActivePage("verifikasi")}
            className={`cursor-pointer font-semibold ${
              activePage === "verifikasi" ? "text-blue-600" : "hover:text-blue-500"
            }`}
          >
            Verifikasi Konseling
          </li>
          <li
            onClick={() => setActivePage("creative")}
            className={`cursor-pointer font-semibold ${
              activePage === "creative" ? "text-blue-600" : "hover:text-blue-500"
            }`}
          >
            Verifikasi Creative Team
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Topbar */}
        <div className="flex justify-end items-center mb-8 space-x-6">
          <Bell className="text-gray-700 cursor-pointer" />
          <div className="flex items-center space-x-2">
            <User className="text-gray-700" />
            <div>
              <p className="font-semibold text-gray-800">Staff SASC</p>
              <p className="text-sm text-gray-600">Administrator</p>
            </div>
          </div>
        </div>

        {/* ======= PAGE: INPUT DATA BUDDY ======= */}
        {activePage === "buddy" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Input Data Buddy</h1>
            <form onSubmit={handleAddBuddy} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">NIM</label>
                  <input
                    type="text"
                    name="nim"
                    value={formBuddy.nim}
                    onChange={handleBuddyChange}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan NIM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={formBuddy.nama}
                    onChange={handleBuddyChange}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan Nama"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Jurusan</label>
                  <input
                    type="text"
                    name="jurusan"
                    value={formBuddy.jurusan}
                    onChange={handleBuddyChange}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan Jurusan"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Tambah Buddy
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Buddy</h2>
              {dataBuddy.length === 0 ? (
                <p className="text-gray-500">Belum ada data buddy.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-3">NIM</th>
                      <th className="py-2 px-3">Nama</th>
                      <th className="py-2 px-3">Jurusan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBuddy.map((b, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{b.nim}</td>
                        <td className="py-2 px-3">{b.nama}</td>
                        <td className="py-2 px-3">{b.jurusan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ======= PAGE: VERIFIKASI PEER COUNSELING ======= */}
        {activePage === "verifikasi" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Verifikasi Data Konseling
            </h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              {dataKonseling.length === 0 ? (
                <p className="text-gray-500">Belum ada data konseling.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="py-2 px-3">NIM</th>
                      <th className="py-2 px-3">Nama</th>
                      <th className="py-2 px-3">Jurusan</th>
                      <th className="py-2 px-3">Tanggal</th>
                      <th className="py-2 px-3">Jam Mulai</th>
                      <th className="py-2 px-3">Jam Selesai</th>
                      <th className="py-2 px-3">Durasi</th>
                      <th className="py-2 px-3">Metode</th>
                      <th className="py-2 px-3">Deskripsi</th>
                      <th className="py-2 px-3">Kendala</th>
                      <th className="py-2 px-3">Support Needed</th>
                      <th className="py-2 px-3 text-center">Verifikasi</th>
                      <th className="py-2 px-3">Komentar Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataKonseling.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{item.nimBuddy}</td>
                        <td className="py-2 px-3">{item.namaBuddy}</td>
                        <td className="py-2 px-3">{item.jurusan}</td>
                        <td className="py-2 px-3">{item.tanggal}</td>
                        <td className="py-2 px-3">{item.jamMulai}</td>
                        <td className="py-2 px-3">{item.jamSelesai}</td>
                        <td className="py-2 px-3">{item.durasi} menit</td>
                        <td className="py-2 px-3 capitalize">{item.metode}</td>
                        <td className="py-2 px-3">{item.deskripsi}</td>
                        <td className="py-2 px-3">{item.kendala}</td>
                        <td className="py-2 px-3">{item.support}</td>
                        <td className="py-2 px-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => updateVerifikasi(i, "setuju")}
                            className="text-green-600 hover:text-green-800 text-xl"
                          >
                            ✔️
                          </button>
                          <button
                            onClick={() => updateVerifikasi(i, "tidak")}
                            className="text-red-600 hover:text-red-800 text-xl"
                          >
                            ❌
                          </button>
                        </div>
                      </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={item.komentarStaff || ""}
                            onChange={(e) => handleKomentarChange(i, e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            placeholder="Tulis komentar..."
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* ======= PAGE: VERIFIKASI CREATIVE TEAM ======= */}
        {activePage === "creative" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Creative Team</h1>

            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              {dataCreative.length === 0 ? (
                <p className="text-gray-500">Belum ada data creative team.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-3">Topik</th>
                      <th className="py-2 px-3">Tanggal</th>
                      <th className="py-2 px-3">Media</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-center">Verifikasi</th>
                      <th className="py-2 px-3">Komentar Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCreative.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{item.topik}</td>
                        <td className="py-2 px-3">{item.tanggalDiskusi}</td>
                        <td className="py-2 px-3">{item.mediaDiskusi}</td>
                        <td className="py-2 px-3">{item.status}</td>
                        <td className="py-2 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={item.verifikasi || false}
                            onChange={() => handleVerifikasiCreative(i)}
                            className="w-5 h-5 accent-green-600 cursor-pointer"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={item.komentarStaff || ""}
                            onChange={(e) => handleKomentarCreative(i, e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            placeholder="Tulis komentar..."
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
