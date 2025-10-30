import React, { useState, useEffect } from "react";
import { Upload, CheckCircle, User, Bell } from "lucide-react";

export default function CreativeTeam() {
  const [formData, setFormData] = useState({
    topik: "",
    statusTopik: "New",
    tanggalDiskusi: "",
    mediaDiskusi: "",
    hasilDiskusi: "",
    status: "",
    uploadFile: null,
    verifikasi: false,
    komentarStaff: "",
  });

  const [dataCreative, setDataCreative] = useState([]);

  // Load data dari localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("creativeData")) || [];
    setDataCreative(savedData);
  }, []);

  // Handle perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle upload file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, uploadFile: file });
  };

  // Submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.topik || !formData.tanggalDiskusi || !formData.mediaDiskusi || !formData.hasilDiskusi || !formData.status) {
      alert("Harap isi semua kolom!");
      return;
    }

    const newEntry = {
      ...formData,
      id: Date.now(),
      uploadName: formData.uploadFile ? formData.uploadFile.name : null,
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
      verifikasi: false,
      komentarStaff: "",
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Creative Team</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="font-semibold text-blue-600">Input Topik Diskusi</li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        {/* Topbar */}
        <div className="flex justify-end items-center mb-8 space-x-6">
          <Bell className="text-gray-700 cursor-pointer" />
          <div className="flex items-center space-x-2">
            <User className="text-gray-700" />
            <div>
              <p className="font-semibold text-gray-800">Creative Team</p>
              <p className="text-sm text-gray-600">Member</p>
            </div>
          </div>
        </div>

        {/* Form Input */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Input Data Creative Team</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Topik */}
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

            {/* Status Topik */}
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

            {/* Tanggal */}
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

            {/* Media */}
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

            {/* Hasil Diskusi */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Hasil Diskusi</label>
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

            {/* Upload File */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Hasil</label>
              <input
                type="file"
                accept=".jpg,.pdf,.mp4"
                onChange={handleFileChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
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

        {/* Daftar Data */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Daftar Hasil Creative Team</h2>
            {dataCreative.length === 0 ? (
              <p className="text-gray-500">Belum ada data diskusi.</p>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-3">Topik</th>
                    <th className="py-2 px-3">Tanggal</th>
                    <th className="py-2 px-3">Media</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">File</th>
                    <th className="py-2 px-3">Status Verifikasi</th>
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
                      <td className="py-2 px-3">
                        {item.uploadName ? (
                          <span className="text-blue-600">{item.uploadName}</span>
                        ) : (
                          <span className="text-gray-400">Tidak ada</span>
                        )}
                      </td>
                      {/* Tambahan dua kolom baru */}
                      <td className="py-2 px-3">
                        {item.verifikasi ? (
                          <span className="text-green-600 font-semibold">Terverifikasi</span>
                        ) : (
                          <span className="text-red-500 font-semibold">Belum Diverifikasi</span>
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {item.komentarStaff ? (
                          <span>{item.komentarStaff}</span>
                        ) : (
                          <span className="text-gray-400 italic">Belum ada komentar</span>
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
