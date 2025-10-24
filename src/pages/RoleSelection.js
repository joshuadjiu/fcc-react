import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [campus, setCampus] = useState("");
  const [pembina, setPembina] = useState("");
  const [periodeMulai, setPeriodeMulai] = useState("");
  const [periodeSelesai, setPeriodeSelesai] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role || !periodeMulai || !periodeSelesai) {
      alert("Harap lengkapi semua data!");
      return;
    }

    if ((role === "peer-counselor" || role === "peer-partner") && !campus) {
      alert("Harap pilih kampus terlebih dahulu!");
      return;
    }

    if (role === "creative-team" && !pembina) {
      alert("Harap pilih pembina terlebih dahulu!");
      return;
    }

    // Menyimpan data sementara dan dapat dihubungkan ke backend
    const dataPeran = {
      role,
      campus,
      pembina,
      periode: `${periodeMulai} - ${periodeSelesai}`,
    };
    localStorage.setItem("roleData", JSON.stringify(dataPeran));

    // Mengarahkan dashboard melalui pilihan role/peran
    if (role === "peer-counselor") navigate("/peer-counselor");
    else if (role === "peer-partner") navigate("/peer-partner");
    else if (role === "creative-team") navigate("/creative-team");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-blue-500">
      <div className="bg-white-100 shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-5 text-black-300">
          Pilih Peran
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pilih Peran */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Peran
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">-- Pilih Peran --</option>
              <option value="peer-counselor">Peer Counselor</option>
              <option value="peer-partner">Peer Partner</option>
              <option value="creative-team">Creative Team</option>
            </select>
          </div>

          {/* Peer Counselor dan Peer Partner memilih region kampus */}
          {role === "peer-counselor" || role === "peer-partner" ? (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Kampus
              </label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">-- Pilih Kampus --</option>
                <option value="KG">Kemanggisan (KG)</option>
                <option value="AS">Alam Sutera (AS)</option>
                <option value="BKS">Bekasi (BKS)</option>
                <option value="BDG">Bandung (BDG)</option>
                <option value="MLG">Malang (MLG)</option>
                <option value="SMG">Semarang (SMG)</option>
                <option value="MDN">Medan (MDN)</option>
              </select>
            </div>
          ) : null}

          {/* Creative Team memilih pembina yang telah dibuat oleh backend */}
          {role === "creative-team" ? (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pembina
              </label>
              <select
                value={pembina}
                onChange={(e) => setPembina(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">-- Pilih Pembina --</option>
                <option value="pembina1">Pembina 1</option>
                <option value="pembina2">Pembina 2</option>
                <option value="pembina3">Pembina 3</option>
              </select>
            </div>
          ) : null}

          {/* Periode Peran */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Periode Peran
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="2022"
                value={periodeMulai}
                onChange={(e) => setPeriodeMulai(e.target.value)}
                className="w-1/2 p-2 border rounded-lg"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="2026"
                value={periodeSelesai}
                onChange={(e) => setPeriodeSelesai(e.target.value)}
                className="w-1/2 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-black p-2 rounded-lg hover:bg-yellow-300"
          >
            Lanjutkan ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
