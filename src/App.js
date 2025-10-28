import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LoginStudent from "./pages/Login";
import Articles from "./pages/Articles";
import Documents from "./pages/Documents";
import SASCStaff from "./pages/SASCStaff";
import PeerCounselor from "./pages/PeerCounselor";
import PeerPartner from "./pages/PeerPartner";
import CreativeTeam from "./pages/CreativeTeam";
import RoleSelection from "./pages/RoleSelection";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginStudent />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/sasc-staff" element={<SASCStaff />} />
        <Route path="/peer-counselor" element={<PeerCounselor />} />
        <Route path="/peer-partner" element={<PeerPartner />} />
        <Route path="/creative-team" element={<CreativeTeam />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
