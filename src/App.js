import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PeerPartnerForm from "./pages/PeerPartnerForm";
import CreativeTeamForm from "./pages/CreativeTeamForm";
import StaffDashboard from "./pages/StaffDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeerPartnerForm />} />
        <Route path="/creative" element={<CreativeTeamForm />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
