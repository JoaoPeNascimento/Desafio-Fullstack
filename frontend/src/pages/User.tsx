import { useEffect, useState } from "react";
import Header from "../components/Header";
import { UserDTO, UserUpdateDTO, UserCreateDTO } from "../types/user";
import { userService } from "../services/userService";
import "./User.css";
import {
  TextField,
  Button,
  Box,
  Divider,
  Typography,
  Alert,
} from "@mui/material";
import UserCreateDialog from "../components/UserCreateDialog";

const UserPage = () => {
  const [user, setUser] = useState<UserDTO | null>(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEnableEdit = () => {
    if (user) {
      setEditFormData({
        name: user.name,
        password: "",
        confirmPassword: "",
      });
    }
    setError(null);
    setSuccessMessage(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
    setEditFormData({ name: "", password: "", confirmPassword: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setError(null);
    setSuccessMessage(null);

    if (editFormData.password || editFormData.confirmPassword) {
      if (editFormData.password !== editFormData.confirmPassword) {
        setError("As senhas não coincidem.");
        return;
      }
      if (editFormData.password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
    }

    try {
      setIsLoading(true);
      const payload: Partial<UserUpdateDTO> = {
        name: editFormData.name,
      };

      if (editFormData.password) {
        payload.password = editFormData.password;
      }

      const updatedUser = await userService.update(payload);
      setUser(updatedUser);
      setIsEditing(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      setError("Não foi possível atualizar as informações.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (newUserData: UserCreateDTO) => {
    setError(null);
    setSuccessMessage(null);

    try {
      setIsLoading(true);
      await userService.create(newUserData);
      setSuccessMessage(`Usuário ${newUserData.name} criado com sucesso!`);
      setOpenCreateDialog(false);
    } catch (err: any) {
      console.error("Erro ao criar usuário:", err);
      setError(err.message || "Falha ao criar usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await userService.getMe();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar as informações do usuário.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading && !user) {
    return (
      <div className="User-page">
        <Header />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="User-page">
      <Header />
      <main className="user-container">
        <div
          className="user-card"
          style={{
            maxWidth: "600px",
            margin: "20px auto",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <Typography variant="h5">Minha Conta</Typography>

            <Box display="flex" gap={2}>
              {user?.role === "ADMIN" && !isEditing && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setOpenCreateDialog(true)}
                >
                  Novo Usuário
                </Button>
              )}

              {!isEditing ? (
                <Button variant="contained" onClick={handleEnableEdit}>
                  Editar Dados
                </Button>
              ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                  >
                    Salvar
                  </Button>
                </div>
              )}
            </Box>
          </div>

          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Divider />

          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              label="Nome Completo"
              name="name"
              variant="outlined"
              fullWidth
              value={isEditing ? editFormData.name : user?.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <TextField
              label="E-mail"
              value={user?.email}
              variant="filled"
              fullWidth
              disabled
              helperText="O e-mail não pode ser alterado."
            />

            <TextField
              label="Função"
              value={user?.role}
              variant="filled"
              fullWidth
              disabled
            />

            {isEditing && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "15px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  Alterar Senha (Opcional)
                </Typography>

                <TextField
                  label="Nova Senha"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={editFormData.password}
                  onChange={handleInputChange}
                  placeholder="Deixe em branco para manter a atual"
                />

                <TextField
                  label="Confirmar Nova Senha"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={editFormData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </form>
        </div>
      </main>

      <UserCreateDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
};

export default UserPage;
