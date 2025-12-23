import { useState, useEffect } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate("/hotels");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/hotels");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: 30,
          borderRadius: 16,
          width: 360,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Connexion</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button style={buttonStyle}>Se connecter</button>

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

        <p style={{ marginTop: 15 }}>
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Login;
