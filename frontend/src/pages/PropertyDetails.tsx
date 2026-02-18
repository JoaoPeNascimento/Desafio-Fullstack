import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PropertyDTO } from "../types/property";
import { propertyService } from "../services/propertyService";
import Header from "../components/Header";
import "./PropertyDetails.css";
import { userService } from "../services/userService";
import { Button } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore";
import PropertyEditDialog from "../components/PropertyEditDialog";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.id);

  const [property, setProperty] = useState<PropertyDTO | null>(null);
  const [favorites, setFavorites] = useState<PropertyDTO[]>([]);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const canEdit =
    role === "ADMIN" || (role !== "CLIENTE" && userId === property?.brokerId);

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
        setError("Não foi possível carregar os detalhes do imóvel.");
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleAddToFavorites = async () => {
    try {
      await userService.addFavorite(Number(id));
      if (property) setFavorites((prev) => [...prev, property]);
    } catch (err) {
      alert("Não foi possível adicionar aos favoritos.");
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await userService.removeFavorite(Number(id));
      setFavorites((prev) => prev.filter((fav) => fav.id !== Number(id)));
    } catch (err) {
      alert("Não foi possível remover dos favoritos.");
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
      console.error("Erro ao atualizar:", err);
      alert("Não foi possível atualizar o imóvel.");
    }
  };

  const handleToggleStatus = async () => {
    if (!property) return;
    try {
      const updatedProperty = await propertyService.toggleStatus(Number(id));
      setProperty(updatedProperty);
    } catch (err) {
      console.error("Erro ao alternar status:", err);
      alert("Não foi possível alternar o status.");
    }
  };

  const handleDeleteProperty = async () => {
    if (!property) return;
    try {
      await propertyService.delete(Number(id));
      navigate("/home");
    } catch (err) {
      alert("Não foi possível deletar o imóvel.");
    }
  };

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

  const images = property.imageUrls.split(",");

  console.log("imóvel:" + JSON.stringify(property));

  return (
    <div className="Property-details">
      <Header />

      <main className="details-container">
        <button onClick={() => navigate(-1)} className="btn-back">
          &larr; Voltar para listagem
        </button>

        <div className="property-card">
          <div className="property-image-placeholder">
            <img src={images[0] || ""} alt="Imagem do imóvel" />
          </div>

          <div className="property-info">
            <div className="header-info">
              <div className="property-title">
                <h1>{property.name}</h1>
                {canEdit && (
                  <Button
                    variant="outlined"
                    onClick={() => setOpenEditDialog(true)}
                  >
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
              {role === "CLIENTE" && (
                <Button
                  className="btn-primary"
                  variant="contained"
                  onClick={
                    isFavorite
                      ? handleRemoveFromFavorites
                      : handleAddToFavorites
                  }
                >
                  {isFavorite
                    ? "Remover dos Favoritos"
                    : "Adicionar aos Favoritos"}
                </Button>
              )}
              {canEdit && (
                <Button variant="outlined" onClick={handleDeleteProperty}>
                  Deletar Imóvel
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <PropertyEditDialog
        open={openEditDialog}
        property={property}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleUpdateProperty}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default PropertyDetails;
