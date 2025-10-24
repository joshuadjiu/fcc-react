import React, { useState } from "react";

export default function CreativeTeam() {
  const [formData, setFormData] = useState({
    topik: "",
    statusTopik: "",
    tanggalDiskusi: "",
    media: "",
    hasilDiskusi: "",
    status: "",
    uploadFile: null,
    verifikasi: false,
    komentarSASC: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data Creative Team berhasil disimpan!");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-sky-200 p-6">
        <h2 className="text-xl font-bold mb-6">Creative Team</h2>
        <ul className="space-y-3">
          <li>Dashboard</li>
          <li>Input Diskusi</li>
          <li>Riwayat Diskusi</li>
          <li>Profil Saya</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-yellow-50 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Input Kegiatan Creative Team
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          {/* Topik */}
          <div>
            <label className="block mb-2 font-semibold">Topik</label>
            <input
              type="text"
              name="topik"
              value={formData.topik}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              placeholder="Contoh: Kampanye Anti Bullying"
            />
          </div>

          {/* Status Topik */}
          <div>
            <label className="block mb-2 font-semibold">Status Topik</label>
            <select
              name="statusTopik"
              value={formData.statusTopik}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">-- Pilih Status --</option>
              <option value="Baru">Baru</option>
              <option value="Lama">Lama</option>
            </select>
          </div>

          {/* Tanggal dan media */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Tanggal Diskusi</label>
              <input
                type="date"
                name="tanggalDiskusi"
                value={formData.tanggalDiskusi}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Media Diskusi</label>
              <select
                name="media"
                value={formData.media}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              >
                <option value="">-- Pilih Media --</option>
                <option value="Zoom">Zoom</option>
                <option value="Chat WA/Line">Chat WA/Line</option>
                <option value="Email">Email</option>
                <option value="Tatap muka">Tatap muka</option>
              </select>
            </div>
          </div>

          {/* Hasil Diskusi */}
          <div>
            <label className="block mb-2 font-semibold">Hasil Diskusi</label>
            <textarea
              name="hasilDiskusi"
              value={formData.hasilDiskusi}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              rows="3"
            />
          </div>

          {/* Status Kegiatan */}
          <div>
            <label className="block mb-2 font-semibold">Status Kegiatan</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">-- Pilih Status --</option>
              <option value="On Progress">On Progress</option>
              <option value="Final">Final</option>
            </select>
          </div>

          {/* Upload File */}
          <div>
            <label className="block mb-2 font-semibold">Upload Hasil</label>
            <input
              type="file"
              accept=".jpg,.pdf,.mp4"
              name="uploadFile"
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
            <p className="text-sm text-gray-600 mt-1">
              Format: .jpg, .pdf, .mp4 (high resolution)
            </p>
          </div>

          {/* Verifikasi SASC */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="verifikasi"
              checked={formData.verifikasi}
              onChange={handleChange}
            />
            <label>Verifikasi SASC</label>
          </div>

          {/* Komentar SASC */}
          <div>
            <label className="block mb-2 font-semibold">Komentar SASC</label>
            <textarea
              name="komentarSASC"
              value={formData.komentarSASC}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              rows="2"
            />
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Simpan Data
          </button>
        </form>
      </div>

      {/* Profil Samping */}
      <div className="w-1/5 bg-white p-6 border-l">
        <h2 className="font-bold text-lg mb-4">Profil Saya</h2>
        <p><b>Nama:</b> Budi</p>
        <p><b>NIM:</b> 2602122222</p>
        <p><b>Fakultas:</b> School of Computer Science</p>
        <p><b>Jurusan:</b> Computer Science</p>
        <p><b>Periode Peran:</b> 2025 - 2026</p>
      </div>
    </div>
  );
}
