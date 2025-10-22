import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LoginStudent from "./pages/Login";
import LoginStaff from "./pages/StaffLogin";
import Articles from "./pages/Articles";
import Documents from "./pages/Documents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginStudent />} />
        <Route path="/staff-login" element={<LoginStaff />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;
