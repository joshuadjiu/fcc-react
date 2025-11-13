// 📁 src/pages/SASCStaff.js
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { Bell, User, CheckCircle, PlusCircle } from "lucide-react";

export default function SASCStaff() {
  const [activePage, setActivePage] = useState("verifikasi");
  const [searchPeriode, setSearchPeriode] = useState("");

  // Data pembina
  const [pembinaList, setPembinaList] = useState([]);
  const [formPembina, setFormPembina] = useState("");

  // Data peran (peer counselor, peer partner, dan creatuve team) diverifikasi oleh SASC
  const [dataCounselor, setDataCounselor] = useState([]);
  const [dataPartner, setDataPartner] = useState([]);
  const [dataCreative, setDataCreative] = useState([]);

  const [dataBuddy, setDataBuddy] = useState([]);
  const [formBuddy, setFormBuddy] = useState({ nim: "", nama: "", jurusan: "" });

  const [notif, setNotif] = useState({ show: false, message: "", type: "" });

  const [isChanged, setIsChanged] = useState(false);

  // Struktur kolom pada tabel untuk tiap role
  const columnsByRole = {
    "Peer Counselor": [
      "periode",
      "kampus",
      "nim",
      "nama",
      "jurusan",
      "tanggalKonseling",
      "jamMulai",
      "jamSelesai",
      "durasi",
      "metode",
      "deskripsi",
      "kendala",
      "supportNeeded",
      "verifikasi",
      "komentarStaff",
      "souvenir"
    ],

    "Peer Partner": [
      "periode",
      "kampus",
      "nimBuddy",
      "namaBuddy",
      "jurusan",
      "tanggal",
      "jamMulai",
      "jamSelesai",
      "durasi",
      "metode",
      "deskripsi",
      "kendala",
      "support",
      "verifikasi",
      "komentarStaff",
      "souvenir"
    ],

    "Creative Team": [
      "periode",
      "pembina",
      "topik",
      "statusTopik",
      "tanggalDiskusi",
      "mediaDiskusi",
      "hasilDiskusi",
      "status",
      "uploadName",
      "verifikasi",
      "komentarStaff"
    ]
  };


  // Melakukan proses load data dari localstorage
  useEffect(() => {
    const savedCounselor = JSON.parse(localStorage.getItem("counselorData")) || [];
    const savedPartner = JSON.parse(localStorage.getItem("partnerData")) || [];
    const savedBuddy = JSON.parse(localStorage.getItem("buddyData")) || [];
    const savedCreative = JSON.parse(localStorage.getItem("creativeData")) || [];
    const savedPembina = JSON.parse(localStorage.getItem("pembinaList")) || [];
    
    const updatedCounselor = savedCounselor.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));

    const updatedPartner = savedPartner.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));

    const updatedCreative = savedCreative.map((item) => ({
      ...item,
      status: item.status || "Menunggu",
    }));
    
    setDataCounselor(updatedCounselor);
    setDataPartner(updatedPartner);
    setDataBuddy(savedBuddy);
    setDataCreative(updatedCreative);
    setPembinaList(savedPembina);
  }, []);

  // Notifikasi
  const showNotif = (message, type = "info") => {
    setNotif({ show: true, message, type });
    setTimeout(() => setNotif({ show: false, message: "", type: "" }), 2000);
  };

  // Fungsi update verifikasi dan komentar pada halaman peran
  const updateVerifikasiCounselor = (index, statusType) => {
    const updated = [...dataCounselor];
    if (!updated[index]) return;

    if (statusType === "setuju") {
      updated[index].status = "Disetujui";
      updated[index].verifikasi = true;
    } else if (statusType === "tidak") {
      updated[index].status = "Tidak Disetujui";
      updated[index].verifikasi = false;
    } else if (statusType === "decline") {
      updated[index].status = "Decline";
      updated[index].verifikasi = false;
    }

    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));
    setIsChanged(true);

    const notifText =
      statusType === "setuju"
        ? "Data counselor Disetujui ✅"
        : statusType === "tidak"
        ? "Data counselor Tidak Disetujui ❌"
        : "Data counselor diminta revisi (Decline) 🔁";

    showNotif(notifText, "info");
  };

  const handleKomentarCounselor = (index, value) => {
    const updated = [...dataCounselor];
    updated[index].komentarStaff = value;
    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));
    setIsChanged(true);
  };

  const handleEditUlangCounselor = (index) => {
    const updated = [...dataCounselor];
    if (!updated[index]) return;

    // Reset beberapa kolom agar bisa diedit ulang
    updated[index].verifikasi = false;
    updated[index].status = "Menunggu";
    updated[index].komentarStaff = "";

    setDataCounselor(updated);
    localStorage.setItem("counselorData", JSON.stringify(updated));

    showNotif("Data dikembalikan untuk diperbaiki", "info");
  };

  // Fungsi update verifikasi dan komentar pada halaman peran
  const updateVerifikasiPartner = (index, statusType) => {
    const updated = [...dataPartner];
    if (!updated[index]) return;

    if (statusType === "setuju") {
      updated[index].status = "Disetujui";
      updated[index].verifikasi = true;
    } else if (statusType === "tidak") {
      updated[index].status = "Tidak Disetujui";
      updated[index].verifikasi = false;
    } else if (statusType === "decline") {
      updated[index].status = "Decline";
      updated[index].verifikasi = false;
    }

    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));
    setIsChanged(true);

    const notifText =
      statusType === "setuju"
        ? "Data counselor Disetujui ✅"
        : statusType === "tidak"
        ? "Data counselor Tidak Disetujui ❌"
        : "Data counselor diminta revisi (Decline) 🔁";

    showNotif(notifText, "info");
  };

  const handleKomentarPartner = (index, value) => {
    const updated = [...dataPartner];
    updated[index].komentarStaff = value;
    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));
    setIsChanged(true);
  };

  const handleEditUlangPartner = (index) => {
    const updated = [...dataPartner];
    if (!updated[index]) return;

    // Reset beberapa kolom agar bisa diedit ulang
    updated[index].verifikasi = false;
    updated[index].status = "Menunggu";
    updated[index].komentarStaff = "";

    setDataPartner(updated);
    localStorage.setItem("partnerData", JSON.stringify(updated));

    showNotif("Data dikembalikan untuk diperbaiki", "info");
  };

  const updateVerifikasiCreative = (index, statusType) => {
    const updated = [...dataCreative];
    if (!updated[index]) return;

    updated[index].statusVerifikasi = statusType === "setuju" ? "Disetujui" : "Tidak Disetujui";
    updated[index].verifikasi = statusType === "setuju";
    updated[index].komentarStaff = updated[index].komentarStaff || "";

    localStorage.setItem("creativeData", JSON.stringify(updated));
    setDataCreative(updated);
    setIsChanged(true);

    // Menampilkan notifikasi
    showNotif(
      `Creative Team ${statusType === "setuju" ? "Disetujui ✅" : "Tidak Disetujui ❌"}`,
      "info"
    );

    // Trigger event untuk halaman CreativeTeam dalam update (listener "storage")
    window.dispatchEvent(new Event("storage"));
  };

  const handleKomentarCreative = (index, value) => {
    const updated = [...dataCreative];
    updated[index].komentarStaff = value;
    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));
    setIsChanged(true);
  };

  // Fungsi menambah dan menghapus pembina
  const handleAddPembina = (e) => {
    e.preventDefault();
    if (!formPembina.trim()) {
      showNotif("Nama pembina tidak boleh kosong!", "error");
      return;
    }
    const updated = [...pembinaList, formPembina.trim()];
    setPembinaList(updated);
    localStorage.setItem("pembinaList", JSON.stringify(updated));
    setFormPembina("");
    showNotif("Pembina berhasil ditambahkan!", "success");
  };

  const handleDeletePembina = (index) => {
    const updated = pembinaList.filter((_, i) => i !== index);
    setPembinaList(updated);
    localStorage.setItem("pembinaList", JSON.stringify(updated));
    showNotif("Pembina dihapus!", "info");
  };


  // fungsi input buddy
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

  const handleDeleteBuddy = (index) => {
    const updated = dataBuddy.filter((_, i) => i !== index);
    setDataBuddy(updated);
    localStorage.setItem("buddyData", JSON.stringify(updated));
    showNotif("Data buddy berhasil dihapus!", "info");
  };

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [riwayat, setRiwayat] = useState([]);

  // Sinkronisasi keseluruhan data untuk tabel (tarik data report)
  const handleTarikData = () => {
    const counselorData = JSON.parse(localStorage.getItem("counselorData")) || [];
    const partnerData = JSON.parse(localStorage.getItem("partnerData")) || [];
    const creativeData = JSON.parse(localStorage.getItem("creativeData")) || [];

    const allData = [
      ...counselorData.map((d) => ({
        role: "Peer Counselor",
        periode: d.periode || "-",
        kampus: d.kampus || "-",
        nim: d.nim || "-",
        nama: d.nama || "-",
        jurusan: d.jurusan || "-",
        tanggalKonseling: d.tanggalKonseling || "-",
        jamMulai: d.jamMulai || "-",
        jamSelesai: d.jamSelesai || "-",
        durasi: d.durasi || "-",
        metode: d.metode || "-",
        deskripsi: d.deskripsi || "-",
        kendala: d.kendala || "-",
        supportNeeded: d.supportNeeded || "-",
        verifikasi: d.verifikasi ? "✅" : "❌",
        komentarStaff: d.komentarStaff || "-",
        souvenir: d.souvenir || "-",
      })),
      ...partnerData.map((d) => ({
        role: "Peer Partner",
        periode: d.periode || "-",
        kampus: d.kampus || "-",
        nimBuddy: d.nimBuddy || "-",
        namaBuddy: d.namaBuddy || "-",
        jurusan: d.jurusan || "-",
        tanggal: d.tanggal || d.tanggalKonseling || "-",
        jamMulai: d.jamMulai || "-",
        jamSelesai: d.jamSelesai || "-",
        durasi: d.durasi || "-",
        metode: d.metode || "-",
        deskripsi: d.deskripsi || "-",
        kendala: d.kendala || "-",
        support: d.support || d.supportNeeded || "-",
        verifikasi: d.verifikasi ? "✅" : "❌",
        komentarStaff: d.komentarStaff || "-",
        souvenir: d.souvenir ? "✅" : "-",
      })),
      ...creativeData.map((d) => ({
        role: "Creative Team",
        periode: d.periode || "-",
        pembina: d.pembina || "-",
        topik: d.topik || "-",
        statusTopik: d.statusTopik || "-",
        tanggalDiskusi: d.tanggalDiskusi || "-",
        mediaDiskusi: d.mediaDiskusi || "-",
        hasilDiskusi: d.hasilDiskusi || "-",
        status: d.status || d.statusTopik || "-",
        uploadName: d.uploadName || "-",
        verifikasi: d.verifikasi ? "✅" : "❌",
        komentarStaff: d.komentarStaff || "-",
      })),
    ];

    const filtered = allData.filter((d) => {
      const matchPeriode = !selectedPeriod || d.periode === selectedPeriod;
      const matchRole = !selectedRole || d.role === selectedRole;
      return matchPeriode && matchRole;
    });

    setRiwayat(filtered);

    Swal.fire({
      icon: "success",
      title: "Data berhasil ditarik!",
      showConfirmButton: false,
      timer: 5000,
      position: "center",
    });
  };

  const handleExportSingleExcel = (item) => {
    // 1️⃣ Ubah data sebelum di-export
    const formattedItem = Object.entries(item).reduce((acc, [key, value]) => {
      // Jika kolom durasi, tambahkan satuan "menit"
      if (key.toLowerCase().includes("durasi") && value) {
        acc[key] = `${value} menit`;
      }
      // Jika kolom checklist (boolean), ubah ke simbol ✅ / ❌
      else if (typeof value === "boolean") {
        acc[key] = value ? "✅" : "❌";
      }
      // Kalau kosong, tampilkan "-"
      else if (value === null || value === undefined || value === "") {
        acc[key] = "-";
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    // 2️⃣ Buat worksheet dan workbook
    const worksheet = XLSX.utils.json_to_sheet([formattedItem]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // 3️⃣ Simpan file
    XLSX.writeFile(workbook, `${item.nama || "report"}_Data Report.xlsx`);
  };

  const handleExportExcel = () => {
    if (riwayat.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Tidak ada data",
        text: "Tarik data terlebih dahulu sebelum ekspor Excel.",
      });
      return;
    }

    // Buat worksheet dari semua data riwayat
    const worksheet = XLSX.utils.json_to_sheet(riwayat);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Simpan file Excel
    XLSX.writeFile(
      workbook,
      `Report_${selectedRole || "Semua"}_${selectedPeriod || "All"}.xlsx`
    );
  };

  const handleSouvenirChange = (item, checked, index) => {
    const updateData = (data, key) => {
      const updated = [...data];
      updated[index].souvenir = checked;
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    };

    if (item.role === "Peer Counselor") {
      setDataCounselor((prev) => updateData(prev, "counselorData"));
    } else if (item.role === "Peer Partner") {
      setDataPartner((prev) => updateData(prev, "partnerData"));
    } else if (item.role === "Creative Team") {
      setDataCreative((prev) => updateData(prev, "creativeData"));
    }

    showNotif(
      `Souvenir ${item.nama || item.namaBuddy || "-"} ${checked ? "✅ Sudah diambil" : "❌ Belum diambil"}`,
      "info"
    );
  };

  // Form tambahan souvenir (manual)
  const [formSouvenir, setFormSouvenir] = useState({
    nama: "",
    role: "",
    periode: "",
    souvenir: false,
  });

  const handleSouvenirInputChange = (e) => {
    const { name, value } = e.target;
    setFormSouvenir({ ...formSouvenir, [name]: value });
  };

  const handleAddSouvenirUser = (e) => {
    e.preventDefault();
    
    if (!formSouvenir.nama || !formSouvenir.role || !formSouvenir.periode) {
      showNotif("Harap isi semua kolom user souvenir!", "error");
      return;
    }

    // Menyimpan data sesuai role
    const dataMap = {
      "Peer Counselor": { data: dataCounselor, key: "counselorData", set: setDataCounselor },
      "Peer Partner": { data: dataPartner, key: "partnerData", set: setDataPartner },
      "Creative Team": { data: dataCreative, key: "creativeData", set: setDataCreative },
    };

    const target = dataMap[formSouvenir.role];
    if (!target) {
      showNotif("Role tidak valid!", "error");
      return;
    }

    const newEntry = {
      nama: formSouvenir.nama,
      periode: formSouvenir.periode,
      role: formSouvenir.role,
      souvenir: false,
    };

    const updated = [...target.data, newEntry];
    target.set(updated);
    localStorage.setItem(target.key, JSON.stringify(updated));

    setFormSouvenir({ nama: "", role: "", periode: "", souvenir: false });
    showNotif(`User baru (${formSouvenir.nama}) berhasil ditambahkan ke ${formSouvenir.role}! ✅`, "success");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Notifikasi */}
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
            onClick={() => setActivePage("pembina")}
            className={`cursor-pointer font-semibold ${activePage === "pembina" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Pembina
          </li>
          <li
            onClick={() => setActivePage("buddy")}
            className={`cursor-pointer font-semibold ${activePage === "buddy" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Input Data Buddy
          </li>
          <li
            onClick={() => setActivePage("counselor")}
            className={`cursor-pointer font-semibold ${activePage === "counselor" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Peer Counselor
          </li>
          <li
            onClick={() => setActivePage("partner")}
            className={`cursor-pointer font-semibold ${activePage === "partner" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Peer Partner
          </li>
          <li
            onClick={() => setActivePage("creative")}
            className={`cursor-pointer font-semibold ${activePage === "creative" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Verifikasi Creative Team
          </li>
          <li
            onClick={() => setActivePage("report")}
            className={`cursor-pointer font-semibold ${activePage === "report" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Tarik Data Report
          </li>
          <li
            onClick={() => setActivePage("souvenir")}
            className={`cursor-pointer font-semibold ${activePage === "souvenir" ? "text-blue-600" : "hover:text-blue-500"}`}
          >
            Checklist Pengambilan Souvenir
          </li>
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
              <p className="font-semibold text-gray-800">Staff SASC</p>
              <p className="text-sm text-gray-600">Administrator</p>
            </div>
          </div>
        </div>

        {/* PAGE: INPUT PEMBINA */}
        {activePage === "pembina" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Input Pembina</h1>

            <form onSubmit={handleAddPembina} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Pembina</label>
                <input
                  type="text"
                  value={formPembina}
                  onChange={(e) => setFormPembina(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  placeholder="Masukkan nama pembina"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Tambah Pembina
                </button>
              </div>
            </form>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Pembina</h2>
              {pembinaList.length === 0 ? (
                <p className="text-gray-500">Belum ada pembina yang ditambahkan.</p>
              ) : (
                <ul className="space-y-2">
                  {pembinaList.map((nama, i) => (
                    <li key={i} className="flex justify-between items-center border-b pb-2">
                      <span>{nama}</span>
                      <button
                        onClick={() => handleDeletePembina(i)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}

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
                    <tr className="border-b bg-gray-100">
                      <th className="py-2 px-3">NIM</th>
                      <th className="py-2 px-3">Nama</th>
                      <th className="py-2 px-3">Jurusan</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBuddy.map((b, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{b.nim}</td>
                        <td className="py-2 px-3">{b.nama}</td>
                        <td className="py-2 px-3">{b.jurusan}</td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => handleDeleteBuddy(i)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </td>
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
              
              {/* 🔍 FITUR SEARCH PERIODE */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari berdasarkan periode (contoh: 2022 - 2026)"
                  className="border rounded-lg p-2 w-full md:w-1/3"
                  value={searchPeriode}
                  onChange={(e) => setSearchPeriode(e.target.value)}
                />
              </div>
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
                    {dataCounselor
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item, i) => (
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
                            <button
                              onClick={() => updateVerifikasiCounselor(i, "setuju")}
                              className="text-green-600 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                              title="Setujui"
                            >
                              ✔️
                            </button>
                            <button
                              onClick={() => updateVerifikasiCounselor(i, "tidak")}
                              className="text-red-600 text-xl transition-transform transform hover:scale-125 hover:-rotate-12 cursor-pointer"
                              title="Tidak Disetujui"
                            >
                              ❌
                            </button>
                            <button
                              onClick={() => updateVerifikasiCounselor(i, "decline")}
                              className="text-orange-500 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                              title="Decline (Edit Ulang)"
                            >
                              🔁
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          {item.status === "Decline (Edit Ulang)" ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item.komentarStaff || ""}
                                onChange={(e) => handleKomentarCounselor(i, e.target.value)}
                                className="border rounded-lg p-2 w-full"
                                placeholder="Komentar revisi..."
                              />
                              <button
                                onClick={() => handleEditUlangCounselor(i)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm"
                              >
                                Kirim Ulang
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={item.komentarStaff || ""}
                              onChange={(e) => handleKomentarCounselor(i, e.target.value)}
                              className="border rounded-lg p-2 w-full"
                              placeholder="Tulis komentar..."
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* PAGE: VERIFIKASI PEER PARTNER */}
        {activePage === "partner" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Peer Partner</h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              
              {/* 🔍 FITUR SEARCH PERIODE */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari berdasarkan periode (contoh: 2022 - 2026)"
                  className="border rounded-lg p-2 w-full md:w-1/3"
                  value={searchPeriode}
                  onChange={(e) => setSearchPeriode(e.target.value)}
                />
              </div>
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
                    {dataPartner
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item, i) => (
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
                            {/* Tombol Setuju */}
                            <button
                              onClick={() => updateVerifikasiPartner(i, "setuju")}
                              className="text-green-600 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                            >
                              ✔️
                            </button>

                            {/* Tombol Tidak Setuju */}
                            <button
                              onClick={() => updateVerifikasiPartner(i, "tidak")}
                              className="text-red-600 text-xl transition-transform transform hover:scale-125 hover:-rotate-12 cursor-pointer"
                            >
                              ❌
                            </button>

                            {/* Tombol Decline */}
                            <button
                              onClick={() => updateVerifikasiPartner(i, "decline")}
                              className="text-yellow-500 text-xl transition-transform transform hover:scale-125 cursor-pointer"
                              title="Minta revisi (Decline)"
                            >
                              🔁
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          {item.status === "Decline (Edit Ulang)" ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={item.komentarStaff || ""}
                                onChange={(e) => handleKomentarPartner(i, e.target.value)}
                                className="border rounded-lg p-2 w-full"
                                placeholder="Komentar revisi..."
                              />
                              <button
                                onClick={() => handleEditUlangPartner(i)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm"
                              >
                                Kirim Ulang
                              </button>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={item.komentarStaff || ""}
                              onChange={(e) => handleKomentarPartner(i, e.target.value)}
                              className="border rounded-lg p-2 w-full"
                              placeholder="Tulis komentar..."
                            />
                          )}
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
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Verifikasi Creative team</h1>
            <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
              
              {/* 🔍 FITUR SEARCH PERIODE */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Cari berdasarkan periode (contoh: 2022 - 2026)"
                  className="border rounded-lg p-2 w-full md:w-1/3"
                  value={searchPeriode}
                  onChange={(e) => setSearchPeriode(e.target.value)}
                />
              </div>
              {dataCreative.length === 0 ? (
                <p className="text-gray-500">Belum ada data Creative Team.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="py-2 px-3">Periode</th>
                      <th className="py-2 px-3">Pembina</th>
                      <th className="py-2 px-3">Topik</th>
                      <th className="py-2 px-3">Status Topik</th>
                      <th className="py-2 px-3">Tanggal Diskusi</th>
                      <th className="py-2 px-3">Media Diskusi</th>
                      <th className="py-2 px-3">Hasil Diskusi</th>
                      <th className="py-2 px-3">Status Proses</th>
                      <th className="py-2 px-3">Hasil Upload</th>
                      <th className="py-2 px-3">Verifikasi</th>
                      <th className="py-2 px-3">Komentar Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCreative
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{item.periode || "-"}</td>
                        <td className="py-2 px-3">{item.pembina || "-"}</td>
                        <td className="py-2 px-3">{item.topik}</td>
                        <td className="py-2 px-3">{item.statusTopik}</td>
                        <td className="py-2 px-3">{item.tanggalDiskusi}</td>
                        <td className="py-2 px-3">{item.mediaDiskusi}</td>
                        <td className="py-2 px-3">{item.hasilDiskusi}</td>
                        <td className="py-2 px-3">{item.status}</td>
                        <td className="py-2 px-3 text-blue-600">
                        {item.uploadName || "-"}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => updateVerifikasiCreative(i, "setuju")}
                              className="text-green-600 text-xl transition-transform transform hover:scale-125 hover:rotate-12 cursor-pointer"
                            >
                              ✔️
                            </button>
                            <button
                              onClick={() => updateVerifikasiCreative(i, "tidak")}
                              className="text-red-600 text-xl transition-transform transform hover:scale-125 hover:-rotate-12 cursor-pointer"
                            >
                              ❌
                            </button>
                          </div>
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

        {/* PAGE: TARIK DATA REPORT */}
        {activePage === "report" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Tarik Data Report</h1>
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Pilih Peran</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">-- Pilih Peran --</option>
                    <option value="Peer Counselor">Peer Counselor</option>
                    <option value="Peer Partner">Peer Partner</option>
                    <option value="Creative Team">Creative Team</option>
                  </select>
                </div>
              <div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Isi Periode</label>
                  <input
                    type="text"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    placeholder="Contoh: 2022 - 2026"
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
            </div>

              <button
                onClick={handleTarikData}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Tarik Data
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Hasil Data</h2>
              {riwayat.length === 0 ? (
                <p className="text-gray-500">Belum ada data yang sesuai.</p>
              ) : (
                <table className="min-w-full text-sm text-left border-collapse table-fixed w-full">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      {columnsByRole[selectedRole]?.map((key) => (
                        <th key={key} className="py-3 px-4 text-center font-semibold text-gray-700 border-b border-gray-200">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </th>
                      ))}
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayat.map((item, i) => (
                      <tr key={i} className={`border-b ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                        {columnsByRole[selectedRole]?.map((key, j) => (
                          <td key={j} className="py-2 px-4 text-center border-b border-gray-100">
                            {typeof item[key] === "boolean"
                              ? item[key]
                                ? "✅"
                                : "❌"
                              : key.toLowerCase().includes("durasi") && item[key] // jika field adalah durasi
                              ? `${item[key]} menit`
                              : item[key] && item[key].toString().trim() !== ""
                              ? item[key].toString()
                              : "-"}
                          </td>
                        ))}
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => handleExportSingleExcel(item)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm"
                          >
                            Export Excel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* PAGE: CHECKLIST PENGAMBILAN SOUVENIR */}
        {activePage === "souvenir" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Checklist Pengambilan Souvenir</h1>
            <form onSubmit={handleAddSouvenirUser} className="bg-white p-6 rounded-2xl shadow mb-8">
              <h2 className="text-lg font-semibold mb-4">Data Baru untuk Pengambilan Souvenir (manual)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={formSouvenir.nama}
                    onChange={handleSouvenirInputChange}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan nama user"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={formSouvenir.role}
                    onChange={handleSouvenirInputChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Pilih role</option>
                    <option value="Peer Counselor">Peer Counselor</option>
                    <option value="Peer Partner">Peer Partner</option>
                    <option value="Creative Team">Creative Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Periode</label>
                  <input
                    type="text"
                    name="periode"
                    value={formSouvenir.periode}
                    onChange={handleSouvenirInputChange}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Contoh: 2022 - 2026"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Tambah
                </button>
              </div>
            </form>
            <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Data Checklist Souvenir Diterima</h1>

            {/* 🔍 FITUR SEARCH PERIODE */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Cari berdasarkan periode (contoh: 2022 - 2026)"
                className="border rounded-lg p-2 w-full md:w-1/3"
                value={searchPeriode}
                onChange={(e) => setSearchPeriode(e.target.value)}
              />
            </div>

              {dataCounselor.length === 0 && dataPartner.length === 0 && dataCreative.length === 0 ? (
                <p className="text-gray-500">Belum ada data mahasiswa untuk pendataan souvenir.</p>
              ) : (
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="py-2 px-3">Nama</th>
                      <th className="py-2 px-3">Peran</th>
                      <th className="py-2 px-3">Periode</th>
                      <th className="py-2 px-3 text-center">Souvenir Telah Diterima</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Bagian Peer Counselor */}
                    {dataCounselor
                      .map((item, i) => ({ ...item, originalIndex: i }))
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item) => (
                        <tr key={`counselor-${item.originalIndex}`} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{item.nama || "-"}</td>
                          <td className="py-2 px-3">Peer Counselor</td>
                          <td className="py-2 px-3">{item.periode || "-"}</td>
                          <td className="py-2 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={item.souvenir === true}
                              onChange={(e) =>
                                handleSouvenirChange(
                                  { ...item, role: "Peer Counselor" },
                                  e.target.checked,
                                  item.originalIndex
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}

                    {/* Bagian Peer Partner */}
                    {dataPartner
                      .map((item, i) => ({ ...item, originalIndex: i }))
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item) => (
                      <tr key={`partner-${item.originalIndex}`} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">
                          {dataBuddy.find((b) => b.nim === item.nim)?.nama || item.namaBuddy || "-"}
                        </td>
                        <td className="py-2 px-3">Peer Partner</td>
                        <td className="py-2 px-3">{item.periode || "-"}</td>
                        <td className="py-2 px-3 text-center">
                          <input
                              type="checkbox"
                              checked={item.souvenir === true}
                              onChange={(e) =>
                                handleSouvenirChange(
                                  { ...item, role: "Peer Partner" },
                                  e.target.checked,
                                  item.originalIndex
                                )
                              }
                            />
                        </td>
                      </tr>
                    ))}

                    {/* Bagian Creative Team */}
                    {dataCreative
                      .map((item, i) => ({ ...item, originalIndex: i }))
                      .filter((item) =>
                        item.periode?.toLowerCase().includes(searchPeriode.toLowerCase())
                      )
                      .map((item) => (
                      <tr key={`creative-${item.originalIndex}`} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{item.nama || "-"}</td>
                        <td className="py-2 px-3">Creative Team</td>
                        <td className="py-2 px-3">{item.periode || "-"}</td>
                        <td className="py-2 px-3 text-center">
                          <input
                              type="checkbox"
                              checked={item.souvenir === true}
                              onChange={(e) =>
                                handleSouvenirChange(
                                  { ...item, role: "Creative Team" },
                                  e.target.checked,
                                  item.originalIndex
                                )
                              }
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
