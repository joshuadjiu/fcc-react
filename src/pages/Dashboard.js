import React from "react";
import { useNavigate } from "react-router-dom";
// import "./form.css";
import "../App.css";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>Dashboard FCC</h2>
      <p>Pilih peran kamu:</p>
      <button onClick={() => navigate("/peer-counselor")}>Peer Counselor</button>
      <button onClick={() => navigate("/peer-partner")}>Peer Partner</button>
      <button onClick={() => navigate("/creative-team")}>Creative Team</button>
    </div>
  );
}
