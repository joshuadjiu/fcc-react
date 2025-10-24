import React, { useState } from "react";
import "./PeerPartner.css";

export default function PeerPartner() {
  const [formData, setFormData] = useState({
    buddy: "",
    tanggal: "",
    waktuMulai: "",
    waktuSelesai: "",
    metode: "",
    deskripsi: "",
    kendala: "",
    support: "",
    verifikasi: false,
    komentar: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Data Peer Partner berhasil disimpan!");
  };

  return (
    <div className="peerpartner-page">
      <aside className="sidebar">
        <h3>Peer Partner</h3>
        <ul>
          <li>Dashboard</li>
          <li>Input Data</li>
          <li>Riwayat</li>
          <li>Profil Saya</li>
        </ul>
      </aside>

      <main className="main-content">
        <h2>Input Data Peer Partner</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-grid">
            <div>
              <label>Nama Buddy (terpairing)</label>
              <select name="buddy" value={formData.buddy} onChange={handleChange}>
                <option value="">-- Pilih Buddy --</option>
                <option value="John Doe - Computer Science">John Doe - Computer Science</option>
                <option value="Jane Smith - Psychology">Jane Smith - Psychology</option>
              </select>
            </div>

            <div>
              <label>Tanggal Konseling</label>
              <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} />
            </div>

            <div>
              <label>Waktu Mulai</label>
              <input type="time" name="waktuMulai" value={formData.waktuMulai} onChange={handleChange} />
            </div>

            <div>
              <label>Waktu Selesai</label>
              <input type="time" name="waktuSelesai" value={formData.waktuSelesai} onChange={handleChange} />
            </div>

            <div>
              <label>Metode Konseling</label>
              <select name="metode" value={formData.metode} onChange={handleChange}>
                <option value="">-- Pilih Metode --</option>
                <option value="Zoom">Zoom</option>
                <option value="Tatap Muka">Tatap Muka</option>
                <option value="Chat WA/Line">Chat WA/Line</option>
                <option value="Telepon">Telepon</option>
              </select>
            </div>

            <div>
              <label>Deskripsi Kegiatan</label>
              <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange}></textarea>
            </div>

            <div>
              <label>Kendala Saat Pendampingan</label>
              <textarea name="kendala" value={formData.kendala} onChange={handleChange}></textarea>
            </div>

            <div>
              <label>Support Needed</label>
              <textarea name="support" value={formData.support} onChange={handleChange}></textarea>
            </div>

            <div className="verifikasi-section">
              <label>
                <input type="checkbox" name="verifikasi" checked={formData.verifikasi} onChange={handleChange} />
                Verifikasi SASC
              </label>
              <textarea name="komentar" placeholder="Komentar Staff" value={formData.komentar} onChange={handleChange}></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn">Simpan Data</button>
        </form>
      </main>

      <aside className="profile-box">
        <h3>Profil Saya</h3>
        <p><strong>Nama:</strong> Budi</p>
        <p><strong>NIM:</strong> 2602122222</p>
        <p><strong>Jurusan:</strong> Computer Science</p>
        <p><strong>Periode Peran:</strong> 2025 - 2026</p>
      </aside>
    </div>
  );
}
