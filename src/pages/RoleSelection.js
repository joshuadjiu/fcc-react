import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [campus, setCampus] = useState("");
  const [pembina, setPembina] = useState("");
  const [periodeMulai, setPeriodeMulai] = useState("");
  const [periodeSelesai, setPeriodeSelesai] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    
    if (!role) newErrors.role = "Harap pilih peran terlebih dahulu!";
    if (!periodeMulai || !periodeSelesai)
      newErrors.periode = "Periode harus diisi!";

    if ((role === "peer-counselor" || role === "peer-partner") && !campus)
      newErrors.campus = "Harap pilih kampus terlebih dahulu!";

    if (role === "creative-team" && !pembina)
      newErrors.pembina = "Harap pilih pembina terlebih dahulu!";

    setErrors(newErrors);

    // Jika tidak ada error, simpan data dan navigasi
    if (Object.keys(newErrors).length === 0) {
      const dataPeran = {
        role,
        campus,
        pembina,
        periode: `${periodeMulai} - ${periodeSelesai}`,
      };
      localStorage.setItem("roleData", JSON.stringify(dataPeran));

      if (role === "peer-counselor") navigate("/peer-counselor");
      else if (role === "peer-partner") navigate("/peer-partner");
      else if (role === "creative-team") navigate("/creative-team");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-blue-500">
      <div className="bg-gray-100 shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-5 text-black-300">
          Pilih Peran
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pilih Peran */}
          <div>
            <label className="block text-gray-900 font-medium mb-1">Peran</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setErrors({ ...errors, role: "" });
              }}
              className={`w-full p-2 border rounded-lg ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">-- Pilih Peran --</option>
              <option value="peer-counselor">Peer Counselor</option>
              <option value="peer-partner">Peer Partner</option>
              <option value="creative-team">Creative Team</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Peer Counselor dan Peer Partner memilih region kampus */}
          {(role === "peer-counselor" || role === "peer-partner") && (
            <div>
              <label className="block text-gray-900 font-medium mb-1">Kampus</label>
              <select
                value={campus}
                onChange={(e) => {
                  setCampus(e.target.value);
                  setErrors({ ...errors, campus: "" });
                }}
                className={`w-full p-2 border rounded-lg ${
                  errors.campus ? "border-red-500" : "border-gray-300"
                }`}
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
              {errors.campus && (
                <p className="text-red-500 text-sm mt-1">{errors.campus}</p>
              )}
            </div>
          )}

          {/* Creative Team memilih pembina */}
          {role === "creative-team" && (
            <div>
              <label className="block text-gray-900 font-medium mb-1">Pembina</label>
              <select
                value={pembina}
                onChange={(e) => {
                  setPembina(e.target.value);
                  setErrors({ ...errors, pembina: "" });
                }}
                className={`w-full p-2 border rounded-lg ${
                  errors.pembina ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">-- Pilih Pembina --</option>
                {(JSON.parse(localStorage.getItem("pembinaList")) || []).map((nama, i) => (
                  <option key={i} value={nama}>{nama}</option>
                ))}
              </select>
              {errors.pembina && (
                <p className="text-red-500 text-sm mt-1">{errors.pembina}</p>
              )}
            </div>
          )}

          {/* Periode Peran */}
          <div>
            <label className="block text-gray-900 font-medium mb-1">
              Periode Peran
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="2022"
                value={periodeMulai}
                onChange={(e) => {
                  setPeriodeMulai(e.target.value);
                  setErrors({ ...errors, periode: "" });
                }}
                className={`w-1/2 p-2 border rounded-lg ${
                  errors.periode ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="2026"
                value={periodeSelesai}
                onChange={(e) => {
                  setPeriodeSelesai(e.target.value);
                  setErrors({ ...errors, periode: "" });
                }}
                className={`w-1/2 p-2 border rounded-lg ${
                  errors.periode ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.periode && (
              <p className="text-red-500 text-sm mt-1">{errors.periode}</p>
            )}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-300 text-black p-2 rounded-lg hover:bg-blue-500"
          >
            Lanjutkan ke Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
