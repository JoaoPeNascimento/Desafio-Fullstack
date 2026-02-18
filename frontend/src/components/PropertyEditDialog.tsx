import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  TextField,
} from "@mui/material";
import { PropertyDTO } from "../types/property";

interface PropertyEditDialogProps {
  open: boolean;
  property: PropertyDTO | null;
  onClose: () => void;
  onConfirm: (updatedData: Partial<PropertyDTO>) => Promise<void>;
  onToggleStatus: () => Promise<void>;
}

const PropertyEditDialog = ({
  open,
  property,
  onClose,
  onConfirm,
  onToggleStatus,
}: PropertyEditDialogProps) => {
  const [formData, setFormData] = useState<Partial<PropertyDTO>>({});

  useEffect(() => {
    if (property) {
      setFormData(property);
    }
  }, [property, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const payload = {
      ...formData,
      value: Number(formData.value),
      bedrooms: Number(formData.bedrooms),
      area: Number(formData.area),
    };

    await onConfirm(payload);
    onClose();
  };

  if (!property) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ao editar você estará alterando os dados do imóvel.
        </DialogContentText>

        <form id="edit-property-form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nome do Imóvel"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Descrição do Imóvel"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={formData.description || ""}
            onChange={handleInputChange}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              margin="dense"
              id="address"
              name="address"
              label="Endereço"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.address || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="city"
              name="city"
              label="Cidade"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.city || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="state"
              name="state"
              label="Estado"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.state || ""}
              onChange={handleInputChange}
            />
          </div>

          <TextField
            margin="dense"
            id="value"
            name="value"
            label="Valor do Imóvel"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.value || ""}
            onChange={handleInputChange}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              margin="dense"
              id="bedrooms"
              name="bedrooms"
              label="Quartos"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.bedrooms || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              id="area"
              name="area"
              label="Área (m²)"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.area || ""}
              onChange={handleInputChange}
            />
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>Ativo: </span>
            <Switch onChange={onToggleStatus} checked={property.active} />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit" form="edit-property-form">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyEditDialog;
