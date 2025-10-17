import React, { useState } from "react";
import "../App.css";

const StaffDashboard = () => {
  const [reports] = useState([
    { nama: "John Doe", peran: "Peer Partner", periode: "2025 - 2026", status: "Verified" },
    { nama: "Jane Smith", peran: "Peer Counselor", periode: "2025 - 2026", status: "Pending" },
  ]);

  const [souvenir, setSouvenir] = useState({});

  const handleChecklist = (index) => {
    setSouvenir({ ...souvenir, [index]: !souvenir[index] });
  };

  return (
    <div className="container">
      <h2>Staff Dashboard (Mock Backend)</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Peran</th>
            <th>Periode</th>
            <th>Status Verifikasi</th>
            <th>Sovenir</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td>{r.nama}</td>
              <td>{r.peran}</td>
              <td>{r.periode}</td>
              <td>{r.status}</td>
              <td>
                <input type="checkbox" checked={souvenir[i] || false} onChange={() => handleChecklist(i)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;
