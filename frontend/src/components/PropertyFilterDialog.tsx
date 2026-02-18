import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { PropertyFilter } from "../types/property";

interface PropertyFilterDialogProps {
  open: boolean;
  currentFilters: PropertyFilter;
  onClose: () => void;
  onApply: (filters: PropertyFilter) => void;
}

const emptyFilters: PropertyFilter = {
  name: "",
  type: undefined,
  minValue: undefined,
  maxValue: undefined,
  minBedrooms: undefined,
};

const PropertyFilterDialog = ({
  open,
  currentFilters,
  onClose,
  onApply,
}: PropertyFilterDialogProps) => {
  const [localFilters, setLocalFilters] =
    useState<PropertyFilter>(emptyFilters);

  useEffect(() => {
    if (open) {
      setLocalFilters(currentFilters);
    }
  }, [open, currentFilters]);

  const handleChange = (field: keyof PropertyFilter, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClean = () => {
    setLocalFilters(emptyFilters);
    onApply(emptyFilters);
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Filtrar Imóveis</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Imóvel</InputLabel>
              <Select
                value={localFilters.type || ""}
                label="Tipo de Imóvel"
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="APARTAMENTO">Apartamento</MenuItem>
                <MenuItem value="CASA">Casa</MenuItem>
                <MenuItem value="TERRENO">Terreno</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Preço Mínimo"
              type="number"
              fullWidth
              value={localFilters.minValue || ""}
              onChange={(e) => handleChange("minValue", Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Preço Máximo"
              type="number"
              fullWidth
              value={localFilters.maxValue || ""}
              onChange={(e) => handleChange("maxValue", Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Mínimo de Quartos"
              type="number"
              fullWidth
              value={localFilters.minBedrooms || ""}
              onChange={(e) =>
                handleChange("minBedrooms", Number(e.target.value))
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClean} color="secondary">
          Limpar
        </Button>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleApply} variant="contained" color="primary">
          Aplicar Filtros
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyFilterDialog;
