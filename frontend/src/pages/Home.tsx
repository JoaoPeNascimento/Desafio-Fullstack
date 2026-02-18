import { useEffect, useState } from "react";
import "./Home.css";
import { propertyService } from "../services/propertyService";
import { PropertyDTO } from "../types/property";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";

const Home = () => {
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getAll({});

      setProperties(data.content);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error(err);
      setError(
        "Não foi possível carregar os imóveis. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  console.log(properties);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <div className="search-container">
          <input type="text" placeholder="Busque aqui seu imóvel..." />
          <button onClick={fetchProperties}>Buscar</button>
        </div>
      </header>

      <main className="main-content">
        {loading && <div className="loading">Carregando imóveis...</div>}
        {error && <div className="error">{error}</div>}

        <h3>Imóveis Disponíveis: {totalElements}</h3>
        {!loading && !error && (
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
    </div>
  );
};

export default Home;
