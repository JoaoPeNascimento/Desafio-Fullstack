import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PropertyDTO, PropertyUpdateDTO } from "../types/property";
import { propertyService } from "../services/propertyService";
import Header from "../components/Header";
import "./PropertyDetails.css";
import { userService } from "../services/userService";
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
import { useAuthStore } from "../store/useAuthStore";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.id);

  const [property, setProperty] = useState<PropertyDTO | null>(null);
  const [favorites, setFavorites] = useState<PropertyDTO[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<PropertyUpdateDTO>>(
    {},
  );
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleAddToFavorites = async () => {
    try {
      userService.addFavorite(Number(id));

      if (!property) return;

      setFavorites((prev) => [...prev, property]);
    } catch (err) {
      console.error("Erro ao adicionar aos favoritos:", err);
      alert(
        "Não foi possível adicionar aos favoritos. Tente novamente mais tarde.",
      );
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await userService.removeFavorite(Number(id));

      setFavorites((prev) => prev.filter((fav) => fav.id !== Number(id)));
    } catch (err) {
      console.error("Erro ao remover dos favoritos:", err);
      alert("Não foi possível remover dos favoritos.");
    }
  };

  const handleClickOpen = () => {
    if (property) {
      setEditFormData(property); // Copia os dados atuais para o form temporário
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Trata Checkbox/Switch diferente de texto
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault(); // Evita o reload da página

    // Converte strings numéricas para números antes de enviar
    const payload = {
      ...editFormData,
      value: Number(editFormData.value),
      bedrooms: Number(editFormData.bedrooms),
      area: Number(editFormData.area),
    };

    await handleUpdateProperty(payload);
    handleClose();
  };

  const handleToggleStatus = async () => {
    try {
      if (!property) return;

      const updatedProperty = await propertyService.toggleStatus(Number(id));
      setProperty(updatedProperty);
    } catch (err) {
      console.error("Erro ao alternar status:", err);
      alert("Não foi possível alternar o status do imóvel.");
    }
  };

  const handleDeleteProperty = async () => {
    if (!property) return;

    try {
      await propertyService.delete(Number(id));
      navigate("/home");
    } catch (err) {
      console.error("Erro ao deletar imóvel:", err);
      alert("Não foi possível deletar o imóvel.");
    }
  };

  const handleUpdateProperty = async (updatedData: Partial<PropertyDTO>) => {
    if (!property) return;

    try {
      const updatedProperty = await propertyService.update(
        Number(id),
        updatedData,
      );
      setProperty(updatedProperty);
    } catch (err) {
      console.error("Erro ao atualizar imóvel:", err);
      alert("Não foi possível atualizar o imóvel.");
    }
  };

  const canEdit =
    role === "ADMIN" || (role !== "CLIENTE" && userId === property?.brokerId);

  console.log("Dados do imóvel:", property);

  console.log("ID do usuario:", userId);
  console.log("ID do usuario:", role);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) {
        setError("ID do imóvel não fornecido.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await propertyService.getById(Number(id));
        setProperty(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
        setError(
          "Não foi possível carregar os detalhes do imóvel. Tente novamente mais tarde.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const favs = await userService.getFavorites();
        setFavorites(favs);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
      }
    };

    fetchPropertyDetails();
    fetchFavorites();
  }, [id]);

  const isFavorite = property
    ? favorites.some((fav) => fav.id === property.id)
    : false;

  if (isLoading) {
    return (
      <div className="Property-details">
        <Header />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Carregando informações do imóvel...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="Property-details">
        <Header />
        <div className="error-container">
          <p>{error || "Imóvel não encontrado."}</p>
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="Property-details">
      <Header />

      <main className="details-container">
        <button onClick={() => navigate(-1)} className="btn-back">
          &larr; Voltar para listagem
        </button>

        <div className="property-card">
          <div className="property-image-placeholder">
            <span>Foto do Imóvel</span>
          </div>

          <div className="property-info">
            <div className="header-info">
              <div className="property-title">
                <h1>{property.name}</h1>
                {canEdit && (
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Editar
                  </Button>
                )}
              </div>
              <p className="location">
                <i className="icon-location">📍</i> {property.address},{" "}
                {property.city} - {property.state}
              </p>
            </div>

            <div className="price-tag">{formatCurrency(property.value)}</div>

            <p className="description">{property.description}</p>

            <div className="features-grid">
              <div className="feature-item">
                <span className="label">Quartos</span>
                <span className="value">{property.bedrooms}</span>
              </div>
              <div className="feature-item">
                <span className="label">Área</span>
                <span className="value">{property.area} m²</span>
              </div>
            </div>

            <hr className="divider" />

            <div className="broker-section">
              <p>
                Anunciado por: <strong>{property.brokerName}</strong>
              </p>
              <Button
                className="btn-primary"
                variant="contained"
                onClick={
                  isFavorite ? handleRemoveFromFavorites : handleAddToFavorites
                }
              >
                {isFavorite
                  ? "Remover dos Favoritos"
                  : "Adicionar aos Favoritos"}
              </Button>
              {canEdit && (
                <Button variant="outlined" onClick={handleDeleteProperty}>
                  Deletar Imóvel
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Dialog open={open} onClose={handleClose}>
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
              value={editFormData.name || ""}
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
              value={editFormData.description || ""}
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
                value={editFormData.address || ""}
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
                value={editFormData.city || ""}
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
                value={editFormData.state || ""}
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
              value={editFormData.value || ""}
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
                value={editFormData.bedrooms || ""}
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
                value={editFormData.area || ""}
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
              <Switch onChange={handleToggleStatus} checked={property.active} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" form="edit-property-form">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PropertyDetails;
