import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

interface PropertyFormState {
  name: string;
  description: string;
  type: "APARTAMENTO" | "CASA" | "TERRENO";
  value: number | string;
  area: number | string;
  bedrooms: number | string;
  address: string;
  city: string;
  state: string;
}

interface PropertyCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const initialFormState: PropertyFormState = {
  name: "",
  description: "",
  type: "APARTAMENTO",
  value: "",
  area: "",
  bedrooms: "",
  address: "",
  city: "",
  state: "",
};

const PropertyCreateDialog = ({
  open,
  onClose,
  onSubmit,
}: PropertyCreateDialogProps) => {
  const [formData, setFormData] = useState<PropertyFormState>(initialFormState);

  useEffect(() => {
    if (open) {
      setFormData(initialFormState);
    }
  }, [open]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      value: Number(formData.value),
      area: Number(formData.area),
      bedrooms: Number(formData.bedrooms),
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cadastrar Novo Imóvel</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Preencha os dados abaixo para anunciar seu imóvel.
        </DialogContentText>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            autoFocus
            name="name"
            label="Nome do Anúncio (Título)"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            name="description"
            label="Descrição"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel>Tipo de Imóvel</InputLabel>
            <Select
              name="type"
              value={formData.type}
              label="Tipo de Imóvel"
              onChange={handleChange}
            >
              <MenuItem value="APARTAMENTO">Apartamento</MenuItem>
              <MenuItem value="CASA">Casa</MenuItem>
              <MenuItem value="TERRENO">Terreno</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="value"
              label="Valor (R$)"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.value}
              onChange={handleChange}
            />
            <TextField
              name="area"
              label="Área (m²)"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.area}
              onChange={handleChange}
            />
          </Box>

          <TextField
            name="bedrooms"
            label="Quartos"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.bedrooms}
            onChange={handleChange}
          />

          <TextField
            name="address"
            label="Endereço"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.address}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="city"
              label="Cidade"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.city}
              onChange={handleChange}
            />
            <TextField
              name="state"
              label="Estado"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.state}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Cadastrar Imóvel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyCreateDialog;
