import React, { useState } from "react";
import "./form.css";

export default function PeerCounselorForm() {
  const [data, setData] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    tanggal: "",
    jamMulai: "",
    jamSelesai: "",
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
  });

  const handleChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const durasi = Math.abs(new Date(`1970-01-01T${data.jamSelesai}:00`) - new Date(`1970-01-01T${data.jamMulai}:00`)) / 60000;
    alert(`Data tersimpan!\nDurasi: ${durasi} menit`);
  };

  return (
    <div className="container">
      <h2>Form Peer Counselor</h2>
      <form onSubmit={handleSubmit}>
        <input id="nim" placeholder="NIM Buddy" onChange={handleChange} required />
        <input id="nama" placeholder="Nama Buddy" onChange={handleChange} required />
        <input id="jurusan" placeholder="Jurusan Buddy" onChange={handleChange} required />
        <input id="tanggal" type="date" onChange={handleChange} required />
        <label>Jam Mulai</label>
        <input id="jamMulai" type="time" onChange={handleChange} required />
        <label>Jam Selesai</label>
        <input id="jamSelesai" type="time" onChange={handleChange} required />
        <select id="metode" onChange={handleChange} required>
          <option value="">Metode Konseling</option>
          <option>Zoom</option>
          <option>Tatap Muka</option>
          <option>Chat (WA/Line)</option>
          <option>Telepon</option>
        </select>
        <textarea id="deskripsi" placeholder="Deskripsi kegiatan" onChange={handleChange}></textarea>
        <textarea id="kendala" placeholder="Kendala saat konseling" onChange={handleChange}></textarea>
        <textarea id="support" placeholder="Support needed" onChange={handleChange}></textarea>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
