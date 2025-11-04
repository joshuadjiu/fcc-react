// 📁 src/pages/SASCStaff.js
import React, { useEffect, useState } from "react";
import { Bell, User, CheckCircle, PlusCircle } from "lucide-react";

export default function SASCStaff() {
  const [activePage, setActivePage] = useState("verifikasi");

  // Data konseling (peer counselor / partner) yang akan diverifikasi oleh SASC
  const [dataCounselor, setDataCounselor] = useState([]);
  const [dataPartner, setDataPartner] = useState([]);

  // Buddy & creative (tetap utuh, tampilan tidak diubah)
  const [dataBuddy, setDataBuddy] = useState([]);
  const [dataCreative, setDataCreative] = useState([]);
  const [formBuddy, setFormBuddy] = useState({ nim: "", nama: "", jurusan: "" });

  // Notifikasi pusat (animasi di tengah)
  const [notif, setNotif] = useState({ show: false, message: "", type: "" });

  // ======== LOAD DATA DARI LOCALSTORAGE ========
  useEffect(() => {
    // pastikan nama key konsisten: gunakan peerCounselingData (format yang kamu pakai di page lain)
    const savedCounselor = JSON.parse(localStorage.getItem("counselorData")) || [];
    const savedPartner = JSON.parse(localStorage.getItem("partnerData")) || [];
    const savedBuddy = JSON.parse(localStorage.getItem("buddyData")) || [];
    const savedCreative = JSON.parse(localStorage.getItem("creativeData")) || [];
    
     const updatedCounselor = savedCounselor.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));
    const updatedPartner = savedPartner.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));
    
    setDataCounselor(updatedCounselor);
    setDataPartner(updatedPartner);
    setDataBuddy(savedBuddy);
    setDataCreative(savedCreative);
  }, []);

  // ======== NOTIFIKASI ========
  const showNotif = (message, type = "info") => {
    setNotif({ show: true, message, type });
    // otomatis hilang setelah 2s
    setTimeout(() => setNotif({ show: false, message: "", type: "" }), 2000);
  };

  // ======== FUNGSI UPDATE VERIFIKASI DAN KOMENTAR STAFF ========
  const updateVerifikasiCounselor = (index, statusType) => {
    const updated = [...dataCounselor];
    if (!updated[index]) return;
    updated[index].status = statusType === "setuju" ? "Disetujui" : "Tidak Disetujui";
    updated[index].verifikasi = statusType === "setuju";
    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));
    showNotif(`Data counselor ${statusType === "setuju" ? "disetujui ✅" : "tidak disetujui ❌"}`, "info");
  };

  const handleKomentarCounselor = (index, value) => {
    const updated = [...dataCounselor];
    updated[index].komentarStaff = value;
    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));
  };

  const updateVerifikasiPartner = (index, statusType) => {
    const updated = [...dataPartner];
    if (!updated[index]) return;
    updated[index].status = statusType === "setuju" ? "Disetujui" : "Tidak Disetujui";
    updated[index].verifikasi = statusType === "setuju";
    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));
    showNotif(`Data partner ${statusType === "setuju" ? "disetujui ✅" : "tidak disetujui ❌"}`, "info");
  };

  const handleKomentarPartner = (index, value) => {
    const updated = [...dataPartner];
    updated[index].komentarStaff = value;
    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));
  };


  // ======== FUNGSI VERIFIKASI CREATIVE TEAM (tetap) ========
  const handleVerifikasiCreative = (index) => {
    const updated = [...dataCreative];
    updated[index].verifikasi = !updated[index].verifikasi;
    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));
    showNotif(updated[index].verifikasi ? "Creative disetujui ✅" : "Creative dibatalkan verifikasi", "info");
  };

  const handleKomentarCreative = (index, value) => {
    const updated = [...dataCreative];
    updated[index].komentarStaff = value;
    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));
  };

  // ======== FUNGSI INPUT BUDDY (tetap) ========
  const handleBuddyChange = (e) => {
    const { name, value } = e.target;
    setFormBuddy({ ...formBuddy, [name]: value });
  };

  const handleAddBuddy = (e) => {
    e.preventDefault();
    if (!formBuddy.nim || !formBuddy.nama || !formBuddy.jurusan) {
      showNotif("Harap isi semua kolom Buddy!", "error");
      return;
    }
    const updated = [...dataBuddy, formBuddy];
    setDataBuddy(updated);
    localStorage.setItem("buddyData", JSON.stringify(updated));
    setFormBuddy({ nim: "", nama: "", jurusan: "" });
    showNotif("Data buddy berhasil ditambahkan!", "success");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Notifikasi tengah (animasi scale + fade) */}
      {notif.show && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none`}
          aria-live="polite"
        >
          <div
            className={`pointer-events-auto px-6 py-4 rounded-2xl shadow-lg transform transition-all duration-300 ${
              notif.show ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } ${notif.type === "success" ? "bg-green-50" : notif.type === "error" ? "bg-red-50" : "bg-white"}`}
            style={{ minWidth: 280, maxWidth: 520 }}
          >
            <p className="text-center font-medium text-sm">
              {notif.message}
            </p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">SASC Staff</h2>
        <ul className="space-y-3 text-gray-700">
          <li
            onClick={() => setActivePage("buddy")}
            className={`cursor-pointer font-semibold ${activePage === "buddy" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Data Buddy
          </li>
          <li
            onClick={() => setActivePage("counselor")}
            className={`cursor-pointer font-semibold ${activePage === "verifikasi" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Peer Counselor
          </li>
          <li
            onClick={() => setActivePage("partner")}
            className={`cursor-pointer font-semibold ${activePage === "verifikasi" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Peer Partner
          </li>
          <li
            onClick={() => setActivePage("creative")}
            className={`cursor-pointer font-semibold ${activePage === "creative" ? "text-blue-600" : "hover:text-blue-500"}`}
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

        {/* PAGE: INPUT DATA BUDDY */}
        {activePage === "buddy" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Input Data Buddy</h1>
            <form onSubmit={handleAddBuddy} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">NIM</label>
                  <input type="text" name="nim" value={formBuddy.nim} onChange={handleBuddyChange} className="border rounded-lg p-2 w-full" placeholder="Masukkan NIM" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
                  <input type="text" name="nama" value={formBuddy.nama} onChange={handleBuddyChange} className="border rounded-lg p-2 w-full" placeholder="Masukkan Nama" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Jurusan</label>
                  <input type="text" name="jurusan" value={formBuddy.jurusan} onChange={handleBuddyChange} className="border rounded-lg p-2 w-full" placeholder="Masukkan Jurusan" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button type="submit" className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
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

        {/* PAGE: VERIFIKASI PEER COUNSELOR */}
        {activePage === "counselor" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Peer Counselor</h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              {dataCounselor.length === 0 ? (
                <p className="text-gray-500">Belum ada data peer counselor.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="py-2 px-3">Periode</th>
                      <th className="py-2 px-3">Kampus</th>
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
                      <th className="py-2 px-3 text-center">Verifikasi</th>
                      <th className="py-2 px-3">Komentar Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCounselor.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{item.periode || "-"}</td>
                        <td className="py-2 px-3">{item.kampus || "-"}</td>
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
                        <td className="py-2 px-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button onClick={() => updateVerifikasiCounselor(i, "setuju")} className="text-green-600 text-xl">✔️</button>
                            <button onClick={() => updateVerifikasiCounselor(i, "tidak")} className="text-red-600 text-xl">❌</button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={item.komentarStaff || ""}
                            onChange={(e) => handleKomentarCounselor(i, e.target.value)}
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

        {/* PAGE: VERIFIKASI Peer Partner */}
        {activePage === "partner" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Peer Partner</h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              {dataPartner.length === 0 ? (
                <p className="text-gray-500">Belum ada data peer partner.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="py-2 px-3">Periode</th>
                      <th className="py-2 px-3">Kampus</th>
                      <th className="py-2 px-3">Nama</th>
                      <th className="py-2 px-3">Tanggal Konseling</th>
                      <th className="py-2 px-3">Jam Mulai</th>
                      <th className="py-2 px-3">Jam Selesai</th>
                      <th className="py-2 px-3">Durasi</th>
                      <th className="py-2 px-3">Metode</th>
                      <th className="py-2 px-3">Deskripsi Kegiatan</th>
                      <th className="py-2 px-3">Kendala Konseling</th>
                      <th className="py-2 px-3">Support Needed</th>
                      <th className="py-2 px-3">Verifikasi</th>
                      <th className="py-2 px-3">Komentar Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPartner.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{item.periode || "-"}</td>
                        <td className="py-2 px-3">{item.kampus || "-"}</td>
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
                        <td className="py-2 px-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button onClick={() => updateVerifikasiPartner(i, "setuju")} className="text-green-600 text-xl">✔️</button>
                            <button onClick={() => updateVerifikasiPartner(i, "tidak")} className="text-red-600 text-xl">❌</button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={item.komentarStaff || ""}
                            onChange={(e) => handleKomentarPartner(i, e.target.value)}
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


        {/* PAGE: VERIFIKASI CREATIVE TEAM */}
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
                      <th className="py-2 px-3">Support Needed</th>
                      <th className="py-2 px-3 text-center">Status</th>
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
                          <input type="checkbox" checked={item.verifikasi || false} onChange={() => handleVerifikasiCreative(i)} className="w-5 h-5 accent-green-600 cursor-pointer" />
                        </td>
                        <td className="py-2 px-3">
                          <input type="text" value={item.komentarStaff || ""} onChange={(e) => handleKomentarCreative(i, e.target.value)} className="border rounded-lg p-2 w-full" placeholder="Tulis komentar..." />
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
