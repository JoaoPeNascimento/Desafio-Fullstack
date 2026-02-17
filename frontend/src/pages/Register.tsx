import { Alert, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { authService } from "../services/authService";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      await authService.register({ name, email, password });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erro inesperado ao tentar se registrar.");
    }
  };

  return (
    <div className="Register">
      <h1>Cadastro</h1>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form className="register-form" onSubmit={handleRegister}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className="register-button"
        >
          Cadastrar
        </Button>
      </form>

      <Link to="/">
        <button className="login-link">Já tem conta? Entrar</button>
      </Link>
    </div>
  );
};

export default Register;
