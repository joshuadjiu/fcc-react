import React, { useState } from "react";
import "../styles/Form.css";

const PeerPartnerForm = () => {
  const [formData, setFormData] = useState({
    buddy: "",
    tanggalKonseling: "",
    waktuMulai: "",
    waktuSelesai: "",
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
  });

  const metodeOptions = ["Zoom", "Tatap Muka", "Chat WA/LINE", "Telepon"];
  const buddyOptions = ["John Doe - 2602123456 - CS", "Jane Smith - 2602456789 - PSY", "Michael Tan - 2602789012 - DKV"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data Peer Partner berhasil dikirim!");
    console.log(formData);
  };

  const hitungDurasi = () => {
    if (!formData.waktuMulai || !formData.waktuSelesai) return "";
    const start = new Date(`2024-01-01T${formData.waktuMulai}`);
    const end = new Date(`2024-01-01T${formData.waktuSelesai}`);
    const diff = (end - start) / (1000 * 60);
    return diff > 0 ? `${diff} menit` : "Jam selesai tidak valid";
  };

  return (
    <div className="container">
      <h2>Peer Partner Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Data Buddy</label>
        <select name="buddy" value={formData.buddy} onChange={handleChange}>
          <option value="">-- Pilih Buddy --</option>
          {buddyOptions.map((b, i) => (
            <option key={i}>{b}</option>
          ))}
        </select>

        <label>Tanggal Konseling</label>
        <input type="date" name="tanggalKonseling" value={formData.tanggalKonseling} onChange={handleChange} />

        <label>Waktu Mulai</label>
        <input type="time" name="waktuMulai" value={formData.waktuMulai} onChange={handleChange} />

        <label>Waktu Selesai</label>
        <input type="time" name="waktuSelesai" value={formData.waktuSelesai} onChange={handleChange} />
        <p>Durasi: {hitungDurasi()}</p>

        <label>Metode Konseling</label>
        <select name="metode" value={formData.metode} onChange={handleChange}>
          <option value="">-- Pilih Metode --</option>
          {metodeOptions.map((m, i) => (
            <option key={i}>{m}</option>
          ))}
        </select>

        <label>Deskripsi Kegiatan</label>
        <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange}></textarea>

        <label>Kendala</label>
        <textarea name="kendala" value={formData.kendala} onChange={handleChange}></textarea>

        <label>Support Needed</label>
        <textarea name="support" value={formData.support} onChange={handleChange}></textarea>

        <button type="submit">Kirim</button>
      </form>
    </div>
  );
};

export default PeerPartnerForm;
