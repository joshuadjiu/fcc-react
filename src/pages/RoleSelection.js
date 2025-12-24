import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [campus, setCampus] = useState("");
  const [pembina, setPembina] = useState("");
  const [periode, setPeriode] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    
    if (!role) newErrors.role = "Harap pilih peran terlebih dahulu!";
    if (!periode)
      newErrors.periode = "Periode harus diisi!";

    if ((role === "peer-counselor" || role === "peer-partner") && !campus)
      newErrors.campus = "Harap pilih kampus terlebih dahulu!";

    if (role === "creative-team" && !pembina)
      newErrors.pembina = "Harap pilih pembina terlebih dahulu!";

    setErrors(newErrors);

    // Menyimpan data dan navigasi
    if (Object.keys(newErrors).length === 0) {
      const dataPeran = {
        role,
        campus,
        pembina,
        periode: periode,
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
          {/* Pilih peran */}
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

          {/* Peer Counselor dan Peer Partner -> region kampus */}
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

          {/* Creative Team -> pembina */}
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
                
                {(JSON.parse(localStorage.getItem("pembinaList")) || []).map((p, i) => (
                  <option key={i} value={p.nama}>
                    {p.nama}
                  </option>
                ))}
              </select>
              
              {errors.pembina && (
                <p className="text-red-500 text-sm mt-1">{errors.pembina}</p>
              )}
            </div>
          )}

          {/* Periode */}
          <div className="text-center">
            <label className="block text-gray-900 font-medium mb-1">
              Periode Peran
            </label>
            <div className="flex items-center justify-center space-x-2">
              <input
                type="number"
                placeholder="Contoh: 2025"
                value={periode}
                onChange={(e) => {
                  setPeriode(e.target.value);
                  setErrors({ ...errors, periode: "" });
                }}
                className={`p-2 border rounded-lg text-center ${
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
