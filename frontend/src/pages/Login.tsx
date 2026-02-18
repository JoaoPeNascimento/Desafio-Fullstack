import { useState } from "react";
import { Button, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const loginAction = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      const tokenData = await authService.login({ email, password });
      loginAction(tokenData.token);

      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Erro inesperado ao tentar fazer login.");
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form className="login-form" onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="login-button"
        >
          Entrar
        </Button>
      </form>

      <Link to="/register">
        <button className="register-link">Não tem conta? Cadastre-se</button>
      </Link>
    </div>
  );
};

export default Login;
