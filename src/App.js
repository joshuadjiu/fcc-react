import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PeerPartnerForm from "./pages/PeerPartnerForm";
import PeerCounselorForm from "./pages/PeerCounselorForm";
import CreativeTeamForm from "./pages/CreativeTeamForm";
import StaffDashboard from "./pages/StaffDashboard";

function App() {
  return (
    <Router>
      {/* Bagian navigasi utama */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 text-white">
        <h1 className="text-4xl font-bold mb-6">FCC Project Dashboard</h1>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/peer-partner"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow hover:bg-indigo-100 transition"
          >
            Peer Partner Form
          </Link>
          <Link
            to="/peer-counselor"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow hover:bg-indigo-100 transition"
          >
            Peer Counselor Form
          </Link>
          <Link
            to="/creative"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow hover:bg-indigo-100 transition"
          >
            Creative Team Form
          </Link>
          <Link
            to="/staff"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow hover:bg-indigo-100 transition"
          >
            Staff Dashboard
          </Link>
        </div>

        {/* Bagian route harus di dalam Router */}
        <div className="mt-10 w-full max-w-4xl">
          <Routes>
            <Route path="/peer-partner" element={<PeerPartnerForm />} />
            <Route path="/peer-counselor" element={<PeerCounselorForm />} />
            <Route path="/creative" element={<CreativeTeamForm />} />
            <Route path="/staff" element={<StaffDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
