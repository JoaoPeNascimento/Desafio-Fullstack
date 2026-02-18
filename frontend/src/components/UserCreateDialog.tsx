import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { UserCreateDTO } from "../types/user";

interface UserCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserCreateDTO) => Promise<void>;
}

const initialFormState: UserCreateDTO = {
  name: "",
  email: "",
  password: "",
  role: "CLIENTE",
};

const UserCreateDialog = ({
  open,
  onClose,
  onSubmit,
}: UserCreateDialogProps) => {
  const [formData, setFormData] = useState<UserCreateDTO>(initialFormState);

  useEffect(() => {
    if (open) {
      setFormData(initialFormState);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Todos os campos são obrigatórios.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Preencha os dados abaixo para criar um novo usuário no sistema.
        </DialogContentText>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nome Completo"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Endereço de Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            name="role"
            label="Função (Role)"
            fullWidth
            variant="outlined"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="CLIENTE">CLIENTE</MenuItem>
            <MenuItem value="CORRETOR">CORRETOR</MenuItem>
            <MenuItem value="ADMIN">ADMIN</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Criar Usuário
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserCreateDialog;
