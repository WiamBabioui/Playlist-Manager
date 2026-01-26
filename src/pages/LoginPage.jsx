import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import "../index.css";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser({ username, email, password });
      } else {
        await loginUser({ email, password });
      }
      navigate("/tracks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glass">
        <h1>{isRegister ? "Inscription" : "Connexion"}</h1>
        <p>{isRegister ? "Crée ton compte" : "Connecte-toi pour accéder à tes playlists"}</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            {isRegister ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <button
          className="switch-btn"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Déjà un compte ? Connecte-toi" : "Pas de compte ? S'inscrire"}
        </button>
      </div>
    </div>
  );
}
