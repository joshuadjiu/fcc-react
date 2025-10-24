import React from "react";
import {
  Home,
  Users,
  CheckSquare,
  Database,
  Gift,
  UserCog,
  Settings,
} from "lucide-react";

export default function SASCStaff() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 🔹 Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex items-center gap-2 p-5 border-b">
          <img
            src="/fcc-logo.png"
            alt="FCC Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-lg">Admin Dashboard (SASC)</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-gray-700">
          <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-blue-100">
            <Home size={18} /> Dashboard
          </button>
          <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-blue-100">
            <Users size={18} /> Pairing Buddy
          </button>
          <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-blue-100">
            <CheckSquare size={18} /> Verifikasi Laporan
          </button>
          <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-blue-100">
            <Database size={18} /> Data Report
          </button>
          <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-blue-100">
            <Gift size={18} /> Souvenir Checklist
          </button>
          <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-blue-100">
            <UserCog size={18} /> Manage Pembina
          </button>
          <button className="flex items-center gap-3 p-2 w-full text-left rounded-md hover:bg-blue-100">
            <Settings size={18} /> Pengaturan
          </button>
        </nav>
      </aside>

      {/* 🔹 Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin</span>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Total Reports</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Reports Verified</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Unverified Reports</h2>
            <p className="text-3xl font-bold text-red-600">0</p>
          </div>
        </div>

        {/* Pairing Buddy & Verifikasi Laporan */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Pairing Buddy */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Pairing Buddy</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nama Peer Counselor/Partner"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Nama Buddy"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Jurusan"
                className="w-full p-2 border rounded-md"
              />
              <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Simpan Pairing
              </button>
            </form>
          </div>

          {/* Verifikasi Laporan */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Verifikasi Laporan</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">No</th>
                  <th>Nama User</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Anisa</td>
                  <td>Pending</td>
                  <td>
                    <button className="text-blue-600 hover:underline">Detail</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Beenmta</td>
                  <td>Pending</td>
                  <td>
                    <button className="text-green-600 hover:underline">Verifikasi</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Report + Souvenir Checklist */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Data Report</h2>
            <input
              type="text"
              placeholder="Periode Peran"
              className="w-full p-2 border rounded-md mb-3"
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full p-2 border rounded-md mb-3"
            />
            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Tampilkan Data
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Souvenir Checklist</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th>Nama</th>
                  <th>Role</th>
                  <th>Sudah Ambil?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Joko</td>
                  <td>Peer Counselor</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
                <tr>
                  <td>Beenmta</td>
                  <td>Peer Partner</td>
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
