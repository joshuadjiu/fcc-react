import React, { useState } from "react";

const CreativeTeamForm = () => {
  const [form, setForm] = useState({
    topik: "",
    statusTopik: "",
    tanggalDiskusi: "",
    mediaDiskusi: "",
    hasilDiskusi: "",
    status: "",
    file: null,
  });

  const mediaOptions = ["Zoom", "Chat WA/LINE", "Email", "Tatap Muka"];
  const statusOptions = ["On Progress", "Final"];
  const statusTopikOptions = ["New", "Lama"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Data Creative Team berhasil dikirim!");
    console.log(form);
  };

  return (
    <div className="container">
      <h2>Creative Team Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Topik</label>
        <input type="text" name="topik" value={form.topik} onChange={handleChange} />

        <label>Status Topik</label>
        <select name="statusTopik" value={form.statusTopik} onChange={handleChange}>
          <option value="">-- Pilih --</option>
          {statusTopikOptions.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>

        <label>Tanggal Diskusi</label>
        <input type="date" name="tanggalDiskusi" value={form.tanggalDiskusi} onChange={handleChange} />

        <label>Media Diskusi</label>
        <select name="mediaDiskusi" value={form.mediaDiskusi} onChange={handleChange}>
          <option value="">-- Pilih --</option>
          {mediaOptions.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>

        <label>Hasil Diskusi</label>
        <textarea name="hasilDiskusi" value={form.hasilDiskusi} onChange={handleChange}></textarea>

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">-- Pilih --</option>
          {statusOptions.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>

        <label>Upload File (jpg, pdf, mp4)</label>
        <input type="file" name="file" accept=".jpg,.pdf,.mp4" onChange={handleChange} />

        <button type="submit">Kirim</button>
      </form>
    </div>
  );
};

export default CreativeTeamForm;
