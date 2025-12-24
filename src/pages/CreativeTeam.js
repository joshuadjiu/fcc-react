import React, { useState, useEffect } from "react";
import { User, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

export default function CreativeTeam() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const loggedInUsername = currentUser?.username;


  const [formData, setFormData] = useState({
    topik: "",
    // statusTopik: "New",
    tanggalDiskusi: "",
    mediaDiskusi: "",
    hasilDiskusi: "",
    status: "",
    linkIG: "",
  });

  // Mengambil data dalam periode dan pembina
  const [dataCreative, setDataCreative] = useState([]);
  const [roleData, setRoleData] = useState({});

  const [activePage, setActivePage] = useState("dashboard");

  // Mengambil data hasil upload
  const [showUploadLink, setShowUploadLink] = useState(false);

  const [evaluation, setEvaluation] = useState(null);

  // Mengambil data dari localstorage
  useEffect(() => {
    let savedCreative = JSON.parse(localStorage.getItem("creativeData"));

    if (!Array.isArray(savedCreative)) {
      savedCreative = [];
    }

    const savedEval = JSON.parse(localStorage.getItem("evaluationData")) || {};

    const filtered = {
      evaluations: Array.isArray(savedEval.evaluations)
        ? savedEval.evaluations.filter(item => item.role === "Creative Team")
        : [],
      questionnaires: Array.isArray(savedEval.questionnaires)
        ? savedEval.questionnaires.filter(item => item.role === "Creative Team")
        : [],
    };

    setEvaluation(filtered);

    const savedRole = JSON.parse(localStorage.getItem("roleData")) || {};

    setRoleData(savedRole);

    if (savedRole.role === "creative-team") {
      const filtered = savedCreative.filter(
        (item) =>
          item.username === loggedInUsername &&
          item.periode === savedRole.periode &&
          item.pembina === savedRole.pembina
      );
      setDataCreative(filtered);
    } else {
      setDataCreative(
        savedCreative.filter(
          (item) => item.username === loggedInUsername
        )
      );
    }
  }, []);

  // Sinkronisasi otomatis jika ada perubahan localstorage misalnya dari SASC Staff)
  useEffect(() => {
    const syncData = () => {
      let updatedCreative = JSON.parse(localStorage.getItem("creativeData"));

      if (!Array.isArray(updatedCreative)) {
        updatedCreative = [];
      }
      
      const savedRole = JSON.parse(localStorage.getItem("roleData")) || {};
      const filtered = updatedCreative.filter(
        (item) =>
          item.periode === savedRole.periode &&
          item.pembina === savedRole.pembina
      );
      setDataCreative(filtered);
    };

    window.addEventListener("storage", syncData);
    return () => window.removeEventListener("storage", syncData);
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "status") setShowUploadLink(value === "Final");
  };

  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/login");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "topik",
      "tanggalDiskusi",
      "mediaDiskusi",
      "hasilDiskusi",
      "status",
    ];
    const empty = requiredFields.filter((f) => !formData[f]);
    if (empty.length > 0) {
        Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Harap isi semua kolom!",
      });
      return;
    }

    if (formData.status === "Final" && !formData.linkIG) {
        Swal.fire({
        icon: "warning",
        title: "Link belum diisi",
        text: "Silakan masukkan link Instagram untuk status Final",
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

    const id = formData.id || Date.now();

    // Data baru dari hasil submit
    const newEntry = {
      ...formData,
      id,

      username: loggedInUsername,
      
      linkIG: formData.linkIG || "",
      periode: roleData.periode || "-",
      pembina: roleData.pembina || "-",
      statusVerifikasi: formData.statusVerifikasi || "Menunggu",
      komentarStaff: formData.komentarStaff || "",
    };

    let existing = JSON.parse(localStorage.getItem("creativeData"));

    if (!Array.isArray(existing)) {
      existing = [];
    }

    // Berfungsi untuk mencari data lama sebelumnya atau data baru (berdasarkan id)
    const index = existing.findIndex(item => item.id === id);

    // Data sudah ada -> melakukan update data, sedangkan data belum ada -> menambahkan data baru (berdasarkan id)
    if (index !== -1) {
      existing[index] = newEntry
    } else {
      existing.push(newEntry);
    }

    localStorage.setItem("creativeData", JSON.stringify(existing));

    setDataCreative(
      existing.filter(
        (item) =>
          item.username === loggedInUsername &&
          item.periode === roleData.periode &&
          item.pembina === roleData.pembina
      )
    );

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data logbook berhasil disimpan",
    });

    // Reset form
    setFormData({
      topik: "",
      // statusTopik: "New",
      tanggalDiskusi: "",
      mediaDiskusi: "",
      hasilDiskusi: "",
      status: "",
      linkIG: "",
    });
    setShowUploadLink(false);
  };

  // Handle edit pada data lama
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      topik: item.topik,
      // statusTopik: item.statusTopik,
      tanggalDiskusi: item.tanggalDiskusi,
      mediaDiskusi: item.mediaDiskusi,
      hasilDiskusi: item.hasilDiskusi,
      status: item.status,
      linkIG: item.linkIG,
      statusVerifikasi: "Menunggu",
      komentarStaff: "",
    });

    setShowUploadLink(item.status === "Final");

    alert("Silakan ubah data dan klik Simpan untuk memperbarui logbook.");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Creative Team</h2>
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

        {/* Info periode dan pembina */}
        {roleData && (
          <div className="mb-6 p-3 rounded-lg bg-blue-100 border border-blue-300 max-w-lg">
            <p className="font-semibold text-gray-800">
              Periode: <span className="font-normal">{roleData.periode || "-"}</span>
            </p>
            <p className="font-semibold text-gray-800">
              Pembina: <span className="font-normal">{roleData.pembina || "-"}</span>
            </p>
          </div>
        )}

        {activePage === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Logbook Kegiatan
            </h1>

            {/* Input logbook kegiatan */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Topik</label>
                  <input
                    type="text"
                    name="topik"
                    value={formData.topik}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Masukkan topik diskusi"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status Topik</label>
                  <select
                    name="statusTopik"
                    value={formData.statusTopik}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="New">New</option>
                    <option value="Lama">Lama</option>
                  </select>
                </div> */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Diskusi</label>
                  <input
                    type="date"
                    name="tanggalDiskusi"
                    value={formData.tanggalDiskusi}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Media Diskusi</label>
                  <select
                    name="mediaDiskusi"
                    value={formData.mediaDiskusi}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Pilih media</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Chat WA/Line">Chat WA/Line</option>
                    <option value="Email">Email</option>
                    <option value="Tatap Muka">Tatap muka</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hasil Diskusi</label>
                  <textarea
                    name="hasilDiskusi"
                    value={formData.hasilDiskusi}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                    rows="3"
                    placeholder="Tuliskan hasil diskusi..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Pilih status</option>
                    <option value="On Progress">On Progress</option>
                    <option value="Final">Final</option>
                  </select>
                </div>

                {showUploadLink && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Upload Link
                    </label>
                    <input
                      type="text"
                      name="linkIG"
                      value={formData.linkIG}
                      onChange={handleChange}
                      placeholder="Isi Link Hasil Final..."
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="flex items-center bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <Upload className="w-5 h-5 mr-2" /> Simpan
                </button>
              </div>
            </form>

            {/* Riwayat data logbook */}
            <h2 className="text-lg font-bold mb-4 text-gray-800">Data Logbook</h2>
            <div
                className="bg-white rounded-xl shadow overflow-auto"
                style={{ maxHeight: "250px", position: "relative" }}
            >
              {dataCreative.length === 0 ? (
                <p className="text-gray-500">Belum ada data.</p>
              ) : (
                <table className="min-w-full text-left text-sm border-collapse">
                  <thead className="sticky top-0 bg-gray-200 z-10 shadow">
                    <tr className="border-b">
                      <th className="py-2 px- text-center">Topik</th>
                      {/* <th className="py-2 px-3 text-center">Status Topik</th> */}
                      <th className="py-2 px-3 text-center">Tanggal Diskusi</th>
                      <th className="py-2 px-3 text-center">Media</th>
                      <th className="py-2 px-3 text-center">Hasil</th>
                      <th className="py-2 px-3 text-center">Status</th>
                      <th className="py-2 px-3 text-center">Hasil Upload Link</th>
                      <th className="py-2 px-3 text-center">Status Verifikasi</th>
                      <th className="py-2 px-3 text-center">Komentar</th>
                      <th className="py-2 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCreative.map((item, i) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-center">{item.topik}</td>
                        {/* <td className="py-2 px-3 text-center">{item.statusTopik}</td> */}
                        <td className="py-2 px-3 text-center">{item.tanggalDiskusi}</td>
                        <td className="py-2 px-3 text-center">{item.mediaDiskusi}</td>
                        <td className="py-2 px-3 text-center">{item.hasilDiskusi}</td>
                        <td className="py-2 px-3 text-center">{item.status}</td>
                        <td className="py-2 px-3 text-center">
                          {item.linkIG ? (
                            <a
                              href={item.linkIG}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline break-words"
                            >
                              {item.linkIG}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              item.statusVerifikasi === "Disetujui"
                                ? "bg-green-100 text-green-700"
                                : item.statusVerifikasi === "Tidak Disetujui"
                                ? "bg-red-100 text-red-700"
                                : item.statusVerifikasi === "Decline (Edit Ulang)"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.statusVerifikasi || "Menunggu"}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">{item.komentarStaff || "-"}</td>
                        <td className="py-2 px-3 text-center">
                          {(item.statusVerifikasi === "Menunggu" || item.statusVerifikasi === "Decline (Edit Ulang)") && (
                            <button
                              onClick={() => handleEdit(item)}
                              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
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

                  {/* Kuesioner Card */}
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
