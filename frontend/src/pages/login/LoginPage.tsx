import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  async function handleLogin() {
    try {
      await login(email, password);
      // A navegação será feita pelo useEffect acima
    } catch (error) {
      console.error(error);
      alert("Login inválido");
    }
  }

  return (
    <div>
      <input
        data-testid="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        data-testid="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button data-testid="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}