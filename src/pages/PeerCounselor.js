import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

export default function PeerCounselor() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const loggedInUsername = currentUser?.username;

  const [formData, setFormData] = useState({
    nimBuddy: "",
    namaBuddy: "",
    jurusan: "",
    kampusArea: "",
    tanggal: "",
    jamMulai: "",
    jamSelesai: "",
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
    statusCase: "",
  });

  const [riwayat, setRiwayat] = useState([]);
  const [roleData, setRoleData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [evaluation, setEvaluation] = useState(null);

  // Mengambil data role diantara periode dan kampus, serta filter riwayat data logbook yang sesuai
  useEffect(() => {
    const savedRole = JSON.parse(localStorage.getItem("roleData"));
    const savedCounselor = JSON.parse(localStorage.getItem("counselorData")) || [];

    // Mengambil role sebelumnya
    const lastRole = JSON.parse(localStorage.getItem("lastRoleData"));

    const savedEval = JSON.parse(localStorage.getItem("evaluationData")) || {};

    const filtered = {
      evaluations: Array.isArray(savedEval.evaluations)
        ? savedEval.evaluations.filter(item => item.role === "Peer Counselor")
        : [],
      questionnaires: Array.isArray(savedEval.questionnaires)
        ? savedEval.questionnaires.filter(item => item.role === "Peer Counselor")
        : [],
    };

    setEvaluation(filtered);

    if (savedRole) {
      localStorage.setItem("lastRoleData", JSON.stringify(savedRole));
      setRoleData(savedRole);
    }

    if (savedRole && loggedInUsername) {
      const filtered = savedCounselor.filter(
        (item) =>
          item.username === loggedInUsername &&
          item.periode === savedRole.periode &&
          item.kampus === (savedRole.kampus || savedRole.campus)
      );
      setRiwayat(filtered);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.status = "Menunggu";
    formData.verifikasi = false;
    formData.komentarStaff = "";

    // Validasi field
    const requiredFields = [
      "nimBuddy",
      "namaBuddy",
      "jurusan",
      "kampusArea",
      "tanggal",
      "jamMulai",
      "jamSelesai",
      "metode",
      "deskripsi",
      "kendala",
      "support",
      "statusCase",
    ];

    const emptyFields = requiredFields.filter((field) => !formData[field]);
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

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
      username: loggedInUsername,
      nim: formData.nimBuddy,
      nama: formData.namaBuddy,
      jurusan: formData.jurusan,
      kampusArea: formData.kampusArea,
      tanggalKonseling: formData.tanggal,
      jamMulai: formData.jamMulai,
      jamSelesai: formData.jamSelesai,
      durasi,
      metode: formData.metode,
      deskripsi: formData.deskripsi,
      kendala: formData.kendala,
      supportNeeded: formData.support,
      statusCase: formData.statusCase,
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

    const filtered = allData.filter(
      (item) =>
        item.username === loggedInUsername &&
        item.periode === roleData.periode &&
        item.kampus === (roleData.kampus || roleData.campus)
    );
    setRiwayat(filtered);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data logbook berhasil disimpan",
    });

    // Reset form
    setFormData({
      nimBuddy: "",
      namaBuddy: "",
      jurusan: "",
      kampusArea: "",
      tanggal: "",
      jamMulai: "",
      jamSelesai: "",
      metode: "",
      deskripsi: "",
      kendala: "",
      support: "",
      statusCase: "",
    });
  };

  const navigate = useNavigate();

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
      kampusArea: selected.kampusArea,
      tanggal: selected.tanggalKonseling,
      jamMulai: selected.jamMulai,
      jamSelesai: selected.jamSelesai,
      metode: selected.metode,
      deskripsi: selected.deskripsi,
      kendala: selected.kendala,
      support: selected.supportNeeded,
      statusCase: selected.statusCase,
    });

    // Menghapus sementara dari localStorage agar tidak double atau menambah data baru saat disubmit lagi
    const allData = JSON.parse(localStorage.getItem("counselorData")) || [];
    allData.splice(index, 1);
    localStorage.setItem("counselorData", JSON.stringify(allData));

    alert("Silakan ubah data dan klik Simpan untuk memperbarui logbook.");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Peer Counselor</h2>
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
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            ← Kembali
          </button>

          <div className="flex items-center space-x-6">

            {/* Profile */}
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
              <div className="mb-4">
                <label className="font-medium">NIM</label>
                <input
                  type="text"
                  name="nimBuddy"
                  value={formData.nimBuddy}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Masukkan NIM..."
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
                  placeholder="Masukkan Nama..."
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
                  placeholder="Masukkan Jurusan..."
                />
              </div>

              <div className="mb-4">
                <label className="font-medium">Area Kampus</label>
                <input
                  type="text"
                  name="kampusArea"
                  value={formData.kampusArea}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Contoh: Binus Kemanggisan, Binus Alam Sutera..."
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

              <div className="mb-4 mt-4">
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
                  placeholder="Isi kendala yang dihadapi saat konseling..."
                />
              </div>

              <div className="mb-4">
                <label className="font-medium">Support Needed</label>
                <textarea
                  name="support"
                  value={formData.support}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Isi dukungan yang dibutuhkan..."
                />
              </div>

              <div className="mb-4">
                <label className="font-medium">Status Case</label>
                <select
                  name="statusCase"
                  value={formData.statusCase}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                >
                  <option value="">-- Pilih Status --</option>
                  <option value="Close">Close</option>
                  <option value="River">River</option>
                </select>
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
              <div
                className="bg-white rounded-xl shadow overflow-auto"
                style={{ maxHeight: "250px", position: "relative" }}
              >
                <table className="min-w-full text-left text-sm border-collapse">
                  <thead className="sticky top-0 bg-gray-200 z-10 shadow">
                    <tr className="border-b">
                      <th className="py-2 px-3 text-center">NIM</th>
                      <th className="py-2 px-3 text-center">Nama</th>
                      <th className="py-2 px-3 text-center">Jurusan</th>
                      <th className="py-2 px-3 text-center">Area Kampus</th>
                      <th className="py-2 px-3 text-center">Tanggal Konseling</th>
                      <th className="py-2 px-3 text-center">Jam Mulai</th>
                      <th className="py-2 px-3 text-center">Jam Selesai</th>
                      <th className="py-2 px-3 text-center">Durasi</th>
                      <th className="py-2 px-3 text-center">Metode</th>
                      <th className="py-2 px-3 text-center">Deskripsi Kegiatan</th>
                      <th className="py-2 px-3 text-center">Kendala Konseling</th>
                      <th className="py-2 px-3 text-center">Support Needed</th>
                      <th className="py-2 px-3 text-center">Status Case</th>
                      <th className="py-2 px-3 text-center">Status Verifikasi</th>
                      <th className="py-2 px-3 text-center">Komentar</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {riwayat.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.nim}</td>
                        <td className="py-2 px-3 text-center">{item.nama}</td>
                        <td className="py-2 px-3 text-center">{item.jurusan}</td>
                        <td className="py-2 px-3 text-center">{item.kampusArea}</td>
                        <td className="py-2 px-3 text-center">{item.tanggalKonseling}</td>
                        <td className="py-2 px-3 text-center">{item.jamMulai}</td>
                        <td className="py-2 px-3 text-center">{item.jamSelesai}</td>
                        <td className="py-2 px-3 text-center">{item.durasi} menit</td>
                        <td className="py-2 px-3 text-center capitalize">{item.metode}</td>
                        <td className="py-2 px-3 text-center">{item.deskripsi}</td>
                        <td className="py-2 px-3 text-center">{item.kendala}</td>
                        <td className="py-2 px-3 text-center">{item.supportNeeded}</td>
                        <td className="py-2 px-3 text-center">{item.statusCase}</td>
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
              </div>
            </div>
            </>
            )}

            {/* Evaluasi dan kuesioner */}
            {activePage === "evaluasi-kuesioner" && (
              <>
                <h2 className="text-2xl font-bold mb-4">Evaluasi & Kuesioner</h2>

                <div className="space-y-8">

                  {/* Evaluasi Card */}
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

                  {/* Kuesioner card */}
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
