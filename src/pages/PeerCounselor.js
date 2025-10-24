import React, { useState } from "react";

export default function PeerCounselor() {
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    tanggal: "",
    waktuMulai: "",
    waktuSelesai: "",
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
    verifikasi: false,
    komentar: "",
    periodeMulai: "",
    periodeSelesai: "",
  });

  const [durasi, setDurasi] = useState(0);

  // Hitung durasi otomatis
  const hitungDurasi = (mulai, selesai) => {
    if (!mulai || !selesai) return 0;
    const start = new Date(`1970-01-01T${mulai}:00`);
    const end = new Date(`1970-01-01T${selesai}:00`);
    const diff = (end - start) / 60000; // menit
    return diff > 0 ? diff : 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));

    if (name === "waktuMulai" || name === "waktuSelesai") {
      const dur = hitungDurasi(
        name === "waktuMulai" ? value : form.waktuMulai,
        name === "waktuSelesai" ? value : form.waktuSelesai
      );
      setDurasi(dur);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data konseling berhasil disimpan!");
  };

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 text-purple-700">
          Peer Counselor
        </h2>
        <nav className="space-y-3">
          <button className="w-full text-left text-gray-700 hover:text-purple-600">
            Dashboard
          </button>
          <button className="w-full text-left text-gray-700 hover:text-purple-600">
            Input Konseling
          </button>
          <button className="w-full text-left text-gray-700 hover:text-purple-600">
            Riwayat Konseling
          </button>
          <button className="w-full text-left text-gray-700 hover:text-purple-600">
            Profil Saya
          </button>
        </nav>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6 text-purple-800">
          Input Data Konseling
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-6"
        >
          {/* Kolom kiri */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium">NIM</label>
              <input
                type="text"
                name="nim"
                value={form.nim}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">Jurusan</label>
              <input
                type="text"
                name="jurusan"
                value={form.jurusan}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Periode Peran</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="periodeMulai"
                  placeholder="2025"
                  value={form.periodeMulai}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-lg"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  name="periodeSelesai"
                  placeholder="2026"
                  value={form.periodeSelesai}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium">Tanggal Konseling</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Waktu Mulai</label>
                <input
                  type="time"
                  name="waktuMulai"
                  value={form.waktuMulai}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Waktu Selesai</label>
                <input
                  type="time"
                  name="waktuSelesai"
                  value={form.waktuSelesai}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Durasi: <span className="font-semibold">{durasi}</span> menit
            </p>
          </div>

          {/* Kolom kanan */}
          <div className="space-y-4">
            <div>
              <label className="block font-medium">Metode Konseling</label>
              <select
                name="metode"
                value={form.metode}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Pilih metode</option>
                <option value="zoom">Zoom</option>
                <option value="tatap muka">Tatap Muka</option>
                <option value="chat">Chat (WA/Line)</option>
                <option value="telpon">Telepon</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Deskripsi Kegiatan</label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">
                Kendala Saat Konseling
              </label>
              <textarea
                name="kendala"
                value={form.kendala}
                onChange={handleChange}
                rows="2"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium">Support Needed</label>
              <input
                type="text"
                name="support"
                value={form.support}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="border-t pt-4">
              <label className="block font-medium">Verifikasi SASC</label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="checkbox"
                  name="verifikasi"
                  checked={form.verifikasi}
                  onChange={handleChange}
                />
                <span>Terverifikasi</span>
              </div>
              <textarea
                name="komentar"
                value={form.komentar}
                onChange={handleChange}
                placeholder="Komentar Staff"
                className="w-full p-2 border rounded-lg mt-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 mt-4"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </main>

      {/* Profil kanan */}
      <aside className="w-72 bg-white shadow-md p-6">
        <h2 className="font-semibold mb-4 text-purple-700">Profil Saya</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Nama:</strong> {form.nama || "-"}
          </p>
          <p>
            <strong>NIM:</strong> {form.nim || "-"}
          </p>
          <p>
            <strong>Jurusan:</strong> {form.jurusan || "-"}
          </p>
          <p>
            <strong>Periode Peran:</strong>{" "}
            {form.periodeMulai && form.periodeSelesai
              ? `${form.periodeMulai} - ${form.periodeSelesai}`
              : "-"}
          </p>
        </div>
      </aside>
    </div>
  );
}
