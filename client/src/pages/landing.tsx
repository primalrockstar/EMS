import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "650+ Study Cards", description: "Comprehensive flashcards across all EMS categories", icon: "📖" },
  { title: "Interactive Scenarios", description: "40+ real-world emergency training cases", icon: "❤️" },
  { title: "Medication Reference", description: "Complete drug database with dosing information", icon: "💊" },
  { title: "15 Medical Calculators", description: "Essential tools for field calculations", icon: "🧮" },
  { title: "Protocol Assistant", description: "AI-powered protocol guidance with voice control", icon: "🤖" },
  { title: "Clark County Protocols", description: "Official EMS protocols for Las Vegas region", icon: "📜" },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #b91c1c, #ef4444)',
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px", textAlign: "center", marginTop: "4rem" }}>
        <h1 style={{ color: "white", fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          ProMedix EMS
        </h1>
        <div style={{ color: "white", fontSize: "1.2rem", marginBottom: "0.5rem" }}>© 2025 ProMedix EMS</div>
        <h2 style={{ color: "white", fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
          Professional Emergency Medical Services Training
        </h2>
        <p style={{ color: "white", marginBottom: "2rem" }}>
          ProMedix EMS is a comprehensive training platform for EMT, AEMT, and Paramedic certification levels.
          Features interactive scenarios, medication references, Clark County protocols, and advanced study tools for emergency medical professionals.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}>
          {features.map(({ title, description, icon }) => (
            <div key={title}
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                color: "white"
              }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
              <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{title}</div>
              <div style={{ fontSize: "0.95rem" }}>{description}</div>
            </div>
          ))}
        </div>
        <button
          style={{
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: "white",
            color: "#b91c1c",
            fontWeight: 600,
            borderRadius: "0.5rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
            border: "none",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onClick={() => navigate("/dashboard")}
        >
          Enter ProMedix EMS
        </button>
        <footer style={{ marginTop: "2rem", color: "white", fontSize: "0.85rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
          <span>Created by Shaun Williamson</span>
          <span>Las Vegas, Nevada</span>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
