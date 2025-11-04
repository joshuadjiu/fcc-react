import React, { useState, useEffect } from "react";
import { Upload, User, Bell } from "lucide-react";

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

  const [dataCreative, setDataCreative] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  // 🔹 Ambil periode & pembina dari role selection
  const [periode, setPeriode] = useState("");
  const [pembina, setPembina] = useState("");

  useEffect(() => {
    const roleData = JSON.parse(localStorage.getItem("roleData"));
    if (roleData && roleData.role === "creative-team") {
      setPeriode(roleData.periode || "Tidak ada data periode");
      setPembina(roleData.pembina || "Tidak ada data pembina");
    }
  }, []);

  // === Load data dari localStorage ===
  useEffect(() => {
    const savedCreative = JSON.parse(localStorage.getItem("creativeData")) || [];
    setDataCreative(savedCreative);
  }, []);

  // === Handle perubahan form ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "status") {
      setShowUpload(value === "Final");
    }
  };

  // === Upload file ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, uploadFile: file });
  };

  // === Submit form ===
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.topik ||
      !formData.tanggalDiskusi ||
      !formData.mediaDiskusi ||
      !formData.hasilDiskusi ||
      !formData.status
    ) {
      alert("Harap isi semua kolom!");
      return;
    }

    if (formData.status === "Final" && !formData.uploadFile) {
      alert("Silakan upload hasil (.jpg, .pdf, .mp4) untuk status Final");
      return;
    }

    const newEntry = {
      ...formData,
      id: Date.now(),
      uploadName: formData.uploadFile ? formData.uploadFile.name : null,
      periode,
      pembina,
      verifikasi: false,
      komentarStaff: "",
    };

    const updated = [...dataCreative, newEntry];
    setDataCreative(updated);
    localStorage.setItem("creativeData", JSON.stringify(updated));

    alert("Data Creative Team berhasil disimpan!");
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Creative Team</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="font-semibold text-blue-600">Dashboard</li>
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
              <p className="font-semibold text-gray-800">Nama</p>
              <p className="text-sm text-gray-600">NIM</p>
            </div>
          </div>
        </div>

        {/* Informasi Periode dan Pembina */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <p className="text-gray-700">
            <strong>Periode:</strong> {periode}
          </p>
          <p className="text-gray-700">
            <strong>Pembina:</strong> {pembina}
          </p>
        </div>

        {/* Input Form */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Isi Form Data Creative Team
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Topik */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Topik
              </label>
              <input
                type="text"
                name="topik"
                value={formData.topik}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                placeholder="Masukkan topik diskusi"
              />
            </div>

            {/* Status Topik */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status Topik
              </label>
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

            {/* Tanggal & Media */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tanggal Diskusi
              </label>
              <input
                type="date"
                name="tanggalDiskusi"
                value={formData.tanggalDiskusi}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Media Diskusi
              </label>
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

            {/* Hasil Diskusi */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Hasil Diskusi
              </label>
              <textarea
                name="hasilDiskusi"
                value={formData.hasilDiskusi}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
                rows="3"
                placeholder="Tulis hasil diskusi..."
              ></textarea>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
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

            {/* Upload */}
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
              <Upload className="w-5 h-5 mr-2" />
              Simpan Data
            </button>
          </div>
        </form>

        {/* Riwayat Form */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4 text-gray-800">
            Riwayat Form Creative Team
          </h2>
          {dataCreative.length === 0 ? (
            <p className="text-gray-500">Belum ada data yang disimpan.</p>
          ) : (
            <table className="min-w-full text-left text-sm border">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-2 px-3">Topik</th>
                  <th className="py-2 px-3">Status Topik</th>
                  <th className="py-2 px-3">Tanggal Diskusi</th>
                  <th className="py-2 px-3">Media Diskusi</th>
                  <th className="py-2 px-3">Hasil Diskusi</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Upload</th>
                  <th className="py-2 px-3">Periode</th>
                  <th className="py-2 px-3">Pembina</th>
                  <th className="py-2 px-3">Verifikasi</th>
                  <th className="py-2 px-3">Komentar Staff</th>
                </tr>
              </thead>
              <tbody>
                {dataCreative.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{item.topik}</td>
                    <td className="py-2 px-3">{item.statusTopik}</td>
                    <td className="py-2 px-3">{item.tanggalDiskusi}</td>
                    <td className="py-2 px-3">{item.mediaDiskusi}</td>
                    <td className="py-2 px-3">{item.hasilDiskusi}</td>
                    <td className="py-2 px-3">{item.status}</td>
                    <td className="py-2 px-3 text-blue-600">
                      {item.uploadName || "-"}
                    </td>
                    <td className="py-2 px-3">{item.periode}</td>
                    <td className="py-2 px-3">{item.pembina}</td>
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
