import React, { useState, useEffect } from "react";
import { User, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

export default function PeerPartner() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const loggedInUsername = currentUser?.username;

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
  const [activePage, setActivePage] = useState("dashboard");
  const [evaluation, setEvaluation] = useState(null);

  // Mengambil periode dan kampus dalam role
  const [roleData, setRoleData] = useState({});

  // Mengambil data dari localstorage
  useEffect(() => {
    const savedBuddy = JSON.parse(localStorage.getItem("buddyData")) || [];
    const savedPartner = JSON.parse(localStorage.getItem("partnerData")) || [];
    const savedRole = JSON.parse(localStorage.getItem("roleData"));

    const savedEval = JSON.parse(localStorage.getItem("evaluationData")) || {};

    const filtered = {
      evaluations: savedEval.evaluations.filter(item => item.role === "Peer Partner"),
      questionnaires: savedEval.questionnaires.filter(item => item.role === "Peer Partner"),
    };

    setEvaluation(filtered);

    if (savedRole) setRoleData(savedRole);

    if (savedRole) {
      const filtered = savedPartner.filter(
        (item) =>
          item.username === loggedInUsername &&
          item.periode === savedRole.periode &&
          item.kampus === (savedRole.kampus || savedRole.campus)
      );
      setRiwayat(filtered);
    } else {
      setRiwayat(
        savedPartner.filter(
          (item) => item.username === loggedInUsername
        )
      );
    }
    setBuddyList(savedBuddy);
  }, []);

  // Durasi otomatis
  useEffect(() => {
    if (formData.jamMulai && formData.jamSelesai) {
      const [startH, startM] = formData.jamMulai.split(":").map(Number);
      const [endH, endM] = formData.jamSelesai.split(":").map(Number);
      const durasi = endH * 60 + endM - (startH * 60 + startM);
      setFormData((prev) => ({ ...prev, durasi: durasi > 0 ? durasi : 0 }));
    }
  }, [formData.jamMulai, formData.jamSelesai]);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  // Submit form
  const handleSubmit = async (e) => {
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
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Harap isi semua kolom!",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menyimpan logbook ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    const existing = JSON.parse(localStorage.getItem("partnerData")) || [];

    // Jika form atau input data logbook belum punya id (data baru), maka akan menambahkan id unik atau baru
    let id = formData.id || Date.now();

    const selectedBuddy = buddyList.find((b) => b.nama === formData.namaBuddy);

    // Data baru dari hasil submit
    const newEntry = {
      ...formData,
      id,

      username: loggedInUsername,

      nimBuddy: selectedBuddy?.nim || "-",
      jurusan: selectedBuddy?.jurusan || "-",

      partnerNama: selectedBuddy?.partnerNama || "-",
      pendampingNama: selectedBuddy?.pendampingNama || "-",
      pendampingRole: selectedBuddy?.pendampingRole || "-",

      verifikasi: false,
      status: "Menunggu",
      komentarStaff: "",
      periode: roleData.periode || "-",
      kampus: roleData.kampus || roleData.campus || "-",
  };

  // Mengecek apakah data ini sudah tersedia atau ada di sebelumnya
  const existingIndex = existing.findIndex((item) => item.id === id);

  // Data sudah ada -> melakukan update data, sedangkan data belum ada -> menambahkan data baru
  if (existingIndex !== -1) {
    existing[existingIndex] = newEntry;
  } else {
    existing.push(newEntry);
  }

  // Menyimpan ke localStorage
  localStorage.setItem("partnerData", JSON.stringify(existing));

  // Sinkronisasi otomatis untuk SASC Staff
  const sascData = JSON.parse(localStorage.getItem("sascPartnerData")) || [];
  const sascIndex = sascData.findIndex((item) => item.id === id);

  const sascEntry = {
    id,
    nama: selectedBuddy?.nama || "-",
    nim: selectedBuddy?.nim || "-",
    jurusan: selectedBuddy?.jurusan || "-",
    tanggalKonseling: formData.tanggal,
    jamMulai: formData.jamMulai,
    jamSelesai: formData.jamSelesai,
    durasi: formData.durasi,
    metode: formData.metode,
    deskripsi: formData.deskripsi,
    kendala: formData.kendala,
    supportNeeded: formData.support,
    status: "Menunggu",
    komentarStaff: "",
    verifikasi: false,
    periode: roleData.periode || "-",
    kampus: roleData.kampus || roleData.campus || "-",
  };

  if (sascIndex !== -1) {
    sascData[sascIndex] = sascEntry;
  } else {
    sascData.push(sascEntry);
  }

  localStorage.setItem("sascPartnerData", JSON.stringify(sascData));

  setRiwayat(
    existing.filter(
      (item) =>
        item.username === loggedInUsername &&
        item.periode === roleData.periode &&
        item.kampus === (roleData.kampus || roleData.campus)
    )
  );

  Swal.fire({
    icon: "success",
    title: "Berhasil",
    text: "Data logbook berhasil disimpan",
  });

  // Reset form
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

// Edit data lama
const handleEdit = (index) => {
  const selected = riwayat[index];
  if (!selected) return;

  // Mengisi kembali form dengan data lama (beserta id-nya agar tidak membuat data baru)
  setFormData({
    id: selected.id,
    namaBuddy: selected.namaBuddy,
    tanggal: selected.tanggal,
    jamMulai: selected.jamMulai,
    jamSelesai: selected.jamSelesai,
    durasi: selected.durasi,
    metode: selected.metode,
    deskripsi: selected.deskripsi,
    kendala: selected.kendala,
    support: selected.support,
  });

  alert("Silakan ubah data dan klik Simpan untuk memperbarui logbook.");
};

  // Handle perubahan input
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

          <li
            onClick={() => setActivePage("dashboard")}
            className={`cursor-pointer font-semibold ${
              activePage === "dashboard"
                ? "text-blue-600"
                : "hover:text-blue-500"
            }`}
          >
            Dashboard
          </li>

          <li
            onClick={() => setActivePage("evaluasi-kuesioner")}
            className={`cursor-pointer font-semibold ${
              activePage === "evaluasi-kuesioner"
                ? "text-blue-600"
                : "hover:text-blue-500"
            }`}
          >
            Evaluasi dan kuesioner
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">

        {/* Topbar */}
        <div className="flex justify-between items-center mb-8 w-full">
          
          {/* Tombol kembali */}
          <button
            onClick={() => navigate("/role-selection")}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
          >
            ← Kembali
          </button>

          {/* Notifikasi dan profile */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
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

        {activePage === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Logbook Kegiatan
            </h1>
            
            {/* Input logbook kegiatan */}
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
                        {b.nim} - {b.nama} - {b.jurusan}
                        {" "}({b.partnerNama} - {b.pendampingNama} ({b.pendampingRole}))
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
                  <option value="Zoom">Zoom</option>
                  <option value="Tatap Muka">Tatap Muka</option>
                  <option value="Chat WA/Line">Chat WA/Line</option>
                  <option value="Telepon">Telepon</option>
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
                  placeholder="Isi kegiatan konseling..."
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
                    placeholder="Isi kendala yang dihadapi saat konseling..."
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
                    placeholder="Isi dukungan yang dibutuhkan..."
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

            {/* Riwayat data logbook */}
            <h2 className="text-lg font-bold mb-4 text-gray-800">Data Logbook</h2>
            <div
                className="bg-white rounded-xl shadow overflow-auto"
                style={{ maxHeight: "255px", position: "relative" }}
            >
              {riwayat.length === 0 ? (
                <p className="text-gray-500">Belum ada data.</p>
              ) : (
                <table className="min-w-full text-left text-sm border-collapse">
                  <thead className="sticky top-0 bg-gray-200 z-10 shadow">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">Nama Buddy</th>
                      <th className="py-2 px-3 text-center">Partner dan Pendamping</th>
                      <th className="py-2 px-3 text-center">Tanggal Konseling</th>
                      <th className="py-2 px-3 text-center">Jam Mulai</th>
                      <th className="py-2 px-3 text-center">Jam Selesai</th>
                      <th className="py-2 px-3 text-center">Durasi</th>
                      <th className="py-2 px-3 text-center">Metode</th>
                      <th className="py-2 px-3 text-center">Deskripsi Kegiatan</th>
                      <th className="py-2 px-3 text-center">Kendala Konseling</th>
                      <th className="py-2 px-3 text-center">Support Needed</th>
                      <th className="py-2 px-3 text-center">Status Verifikasi</th>
                      <th className="py-2 px-3 text-center">Komentar</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayat.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.nama || item.namaBuddy}</td>
                        <td className="py-2 px-3 text-center">
                          {item.partnerNama} - {item.pendampingNama} ({item.pendampingRole})
                        </td>
                        <td className="py-2 px-3 text-center">
                          {item.tanggalKonseling || item.tanggal}
                        </td>
                        <td className="py-2 px-3 text-center">{item.jamMulai}</td>
                        <td className="py-2 px-3 text-center">{item.jamSelesai}</td>
                        <td className="py-2 px-3 text-center">{item.durasi} menit</td>
                        <td className="py-2 px-3 text-center capitalize">{item.metode}</td>
                        <td className="py-2 px-3 text-center">{item.deskripsi}</td>
                        <td className="py-2 px-3 text-center">{item.kendala}</td>
                        <td className="py-2 px-3 text-center">
                          {item.supportNeeded || item.support}
                        </td>
                        <td className="py-2 px-3 text-center">
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
                        <td className="py-2 px-3 text-center">{item.komentarStaff || "-"}</td>
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
              )}
            </div>
            </>
            )}

            {/* Evaluasi dan kuesioner */}
            {activePage === "evaluasi-kuesioner" && (
              <>
                <h2 className="text-2xl font-bold mb-4">Evaluasi & Kuesioner</h2>

                <div className="space-y-8">

                  {/* Evaluasi card */}
                  <div className="bg-white shadow-lg rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Evaluasi</h3>

                    {evaluation?.evaluations?.length === 0 ? (
                      <p className="text-gray-500">Belum ada evaluasi.</p>
                    ) : (
                      <div className="space-y-4">
                        {evaluation.evaluations.map((item, index) => (
                          <div key={index} className="border p-4 rounded-lg">
                            <h4 className="font-semibold">{item.title}</h4>
                            <a
                              href={item.link}
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              Buka Form
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Kueisoner card */}
                  <div className="bg-white shadow-lg rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Kuesioner</h3>

                    {evaluation?.questionnaires?.length === 0 ? (
                      <p className="text-gray-500">Belum ada kuesioner.</p>
                    ) : (
                      <div className="space-y-4">
                        {evaluation.questionnaires.map((item, index) => (
                          <div key={index} className="border p-4 rounded-lg">
                            <h4 className="font-semibold">{item.title}</h4>
                            <a
                              href={item.link}
                              target="_blank"
                              className="text-blue-600 underline"
                            >
                              Buka Form
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                </>
              )}
          </main>
        </div>
      );
    }
