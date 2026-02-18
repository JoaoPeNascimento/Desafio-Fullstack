import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./PropertiesPage.css";
import { PropertyDTO } from "../types/property";
import { propertyService } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getUserProperties();

      setProperties(data);
    } catch (err) {
      console.error(err);
      setError(
        "Não foi possível carregar os imóveis. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="Property-page">
      <Header />
      {loading && <div className="loading">Carregando imóveis...</div>}
      {error && <div className="error">{error}</div>}
      <main>
        <h2>Meus imóveis</h2>
        {properties.length === 0 && (
          <p>Você ainda não tem imóveis cadastrados.</p>
        )}
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              nome={property.name}
              key={property.id}
              {...property}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PropertiesPage;
