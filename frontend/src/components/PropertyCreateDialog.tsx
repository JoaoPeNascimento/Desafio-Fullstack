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
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { Upload, X } from "lucide-react"; // Usando lucide-react pois está no seu package.json
import { uploadImageToCloudinary } from "../services/cloudinaryService"; // Ajuste o caminho se necessário

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
  imageUrl: string;
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
  imageUrl: "",
};

const PropertyCreateDialog = ({
  open,
  onClose,
  onSubmit,
}: PropertyCreateDialogProps) => {
  const [formData, setFormData] = useState<PropertyFormState>(initialFormState);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(initialFormState);
      setFiles([]);
      setLoading(false);
    }
  }, [open]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Adiciona novos arquivos aos já existentes
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
      const imageUrls = await Promise.all(uploadPromises);

      const payload = {
        ...formData,
        value: Number(formData.value),
        area: Number(formData.area),
        bedrooms: Number(formData.bedrooms),

        imageUrls: imageUrls.join(","),
      };

      await onSubmit(payload);
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
      alert("Erro ao criar imóvel. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Cadastrar Novo Imóvel</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Preencha os dados abaixo para anunciar seu imóvel.
        </DialogContentText>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Box
            sx={{
              border: "1px dashed #ccc",
              p: 2,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              startIcon={<Upload size={18} />}
              disabled={loading}
            >
              Selecionar Fotos
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            {files.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {files.map((file, index) => (
                  <Box
                    key={index}
                    sx={{ position: "relative", width: 80, height: 80 }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFile(index)}
                      disabled={loading}
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        bgcolor: "white",
                        boxShadow: 1,
                        "&:hover": { bgcolor: "#f5f5f5" },
                        width: 24,
                        height: 24,
                      }}
                    >
                      <X size={14} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
            <Typography
              variant="caption"
              display="block"
              sx={{ mt: 1, color: "text.secondary" }}
            >
              {files.length} foto(s) selecionada(s)
            </Typography>
          </Box>

          <TextField
            autoFocus
            name="name"
            label="Nome do Anúncio (Título)"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />

          <TextField
            name="description"
            label="Descrição"
            multiline
            rows={3}
            fullWidth
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Tipo de Imóvel</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Tipo de Imóvel"
                onChange={handleChange}
                disabled={loading}
              >
                <MenuItem value="APARTAMENTO">Apartamento</MenuItem>
                <MenuItem value="CASA">Casa</MenuItem>
                <MenuItem value="TERRENO">Terreno</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="bedrooms"
              label="Quartos"
              type="number"
              fullWidth
              value={formData.bedrooms}
              onChange={handleChange}
              disabled={loading}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              name="value"
              label="Valor (R$)"
              type="number"
              fullWidth
              value={formData.value}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              name="area"
              label="Área (m²)"
              type="number"
              fullWidth
              value={formData.area}
              onChange={handleChange}
              disabled={loading}
            />
          </Box>

          <TextField
            name="address"
            label="Endereço"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              name="city"
              label="Cidade"
              fullWidth
              value={formData.city}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              name="state"
              label="Estado"
              fullWidth
              value={formData.state}
              onChange={handleChange}
              disabled={loading}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? "Salvando..." : "Cadastrar Imóvel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyCreateDialog;
