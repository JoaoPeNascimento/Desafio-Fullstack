import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./PropertiesPage.css";
import { PropertyDTO } from "../types/property";
import { propertyService } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import { Button } from "@mui/material";
import { PlusCircleIcon } from "lucide-react";
import PropertyCreateDialog from "../components/PropertyCreateDialog";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyDTO[]>([]);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const data = await propertyService.getUserProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        "Não foi possível carregar os imóveis. Tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreateProperty = async (newPropertyData: any) => {
    try {
      await propertyService.create(newPropertyData);

      setOpenCreateDialog(false);
      fetchProperties();
    } catch (err) {
      console.error("Erro ao criar imóvel:", err);
      alert("Erro ao criar imóvel. Verifique os dados e tente novamente.");
    }
  };

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

  return (
    <div className="Property-page">
      <Header />

      {error && <div className="error">{error}</div>}

      <main>
        <div className="add-container">
          <h2>Meus imóveis</h2>
          <Button variant="contained" onClick={() => setOpenCreateDialog(true)}>
            <PlusCircleIcon style={{ marginRight: "5px" }} />
            Novo Imóvel
          </Button>
        </div>

        {properties.length === 0 ? (
          <p>Você ainda não tem imóveis cadastrados.</p>
        ) : (
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard
                nome={property.name}
                key={property.id}
                {...property}
              />
            ))}
          </div>
        )}
      </main>

      <PropertyCreateDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onSubmit={handleCreateProperty}
      />
    </div>
  );
};

export default PropertiesPage;
