import React, { useState, useEffect } from "react";
import { Bell, User, Upload } from "lucide-react";

export default function CreativeTeam() {
  const [formData, setFormData] = useState({
    topik: "",
    statusTopik: "New",
    tanggalDiskusi: "",
    mediaDiskusi: "",
    hasilDiskusi: "",
    status: "",
    uploadFile: null,
  });

  // Mengambil data, periode, dan pembina
  const [dataCreative, setDataCreative] = useState([]);
  const [roleData, setRoleData] = useState({});

  // Mengambil data hasil upload
  const [showUpload, setShowUpload] = useState(false);

  // Mengambil data dari localstorage
  useEffect(() => {
    let savedCreative = JSON.parse(localStorage.getItem("creativeData"));

    if (!Array.isArray(savedCreative)) {
      savedCreative = [];
    }

    const savedRole = JSON.parse(localStorage.getItem("roleData")) || {};

    setRoleData(savedRole);

    if (savedRole.role === "creative-team") {
      const filtered = savedCreative.filter(
        (item) =>
          item.periode === savedRole.periode &&
          item.pembina === savedRole.pembina
      );
      setDataCreative(filtered);
    } else {
      setDataCreative(savedCreative);
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
    if (name === "status") setShowUpload(value === "Final");
  };

  // Fungsi converter dalam file upload
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle perubahan file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    setFormData((prev) => ({
      ...prev,
      uploadFile: file,
      uploadBase64: base64,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
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
      alert("Harap isi semua kolom!");
      return;
    }

    if (formData.status === "Final" && !formData.uploadFile) {
      alert("Silakan upload hasil (.jpg, .pdf, .mp4) untuk status Final");
      return;
    }

    const id = formData.id || Date.now();

    // Data baru dari hasil submit
    const newEntry = {
      ...formData,
      id,
      uploadName: formData.uploadFile ? formData.uploadFile.name : null,
      uploadData: formData.uploadBase64 || null,
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

    // Filter proses update atau perubahan periode dan pembina
    setDataCreative(
      existing.filter(
        (item) =>
          item.periode === roleData.periode &&
          item.pembina === roleData.pembina
      )
    );

    alert("Data logbook berhasil disimpan");

    // Reset form
    setFormData({
      topik: "",
      statusTopik: "New",
      tanggalDiskusi: "",
      mediaDiskusi: "",
      hasilDiskusi: "",
      status: "",
      uploadFile: null,
    });
    setShowUpload(false);
  };

  // Handle edit pada data lama
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      topik: item.topik,
      statusTopik: item.statusTopik,
      tanggalDiskusi: item.tanggalDiskusi,
      mediaDiskusi: item.mediaDiskusi,
      hasilDiskusi: item.hasilDiskusi,
      status: item.status,
      uploadFile: null,
      statusVerifikasi: "Menunggu",
      komentarStaff: "",
    });

    setShowUpload(item.status === "Final");

    alert("Silakan ubah data dan klik Simpan untuk memperbarui logbook.");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Creative Team</h2>
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
              <p className="font-semibold text-gray-800">
                {localStorage.getItem("userName") || "Nama"}
              </p>
              <p className="text-sm text-gray-600">
                {localStorage.getItem("userNIM") || "NIM"}
              </p>
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

        {/* Input logbook */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Logbook Kegiatan
        </h1>

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

            <div>
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
            </div>

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
                <option value="Chat WA/LINE">Chat WA/LINE</option>
                <option value="Email">Email</option>
                <option value="Tatap muka">Tatap muka</option>
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

            {showUpload && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Upload Hasil (JPG, PDF, MP4)
                </label>
                <input
                  type="file"
                  accept=".jpg,.pdf,.mp4"
                  onChange={handleFileChange}
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
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Data Logbook</h2>
          {dataCreative.length === 0 ? (
            <p className="text-gray-500">Belum ada data.</p>
          ) : (
            <table className="min-w-full text-left text-sm border">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-2 px-3">Topik</th>
                  <th className="py-2 px-3">Status Topik</th>
                  <th className="py-2 px-3">Tanggal Diskusi</th>
                  <th className="py-2 px-3">Media</th>
                  <th className="py-2 px-3">Hasil</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Upload</th>
                  <th className="py-2 px-3">Status Verifikasi</th>
                  <th className="py-2 px-3">Komentar</th>
                  <th className="py-2 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataCreative.map((item, i) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{item.topik}</td>
                    <td className="py-2 px-3">{item.statusTopik}</td>
                    <td className="py-2 px-3">{item.tanggalDiskusi}</td>
                    <td className="py-2 px-3">{item.mediaDiskusi}</td>
                    <td className="py-2 px-3">{item.hasilDiskusi}</td>
                    <td className="py-2 px-3">{item.status}</td>
                    <td className="py-2 px-3">
                      {item.uploadName ? (
                        <a
                          href={item.uploadData}
                          download={item.uploadName}
                          className="text-blue-600 underline"
                        >
                          {item.uploadName}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-2 px-3">
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
                    <td className="py-2 px-3">{item.komentarStaff || "-"}</td>
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
      </main>
    </div>
  );
}
