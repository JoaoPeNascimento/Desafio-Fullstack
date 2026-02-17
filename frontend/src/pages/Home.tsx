import React, { useEffect, useState } from "react";
import "./Home.css";
import { UserCircleIcon, MapPin, Bed, Ruler } from "lucide-react";

// Importe a interface e o serviço do local correto no seu projeto
import { propertyService } from "../services/propertyService"; // Ajuste o caminho
import { PropertyDTO } from "../types/property"; // Ajuste o caminho

const Home = () => {
  // Estados para armazenar os dados, carregamento e erros
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os dados assim que o componente montar
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      // Chamada sem filtros, confiando nos valores padrão definidos no service (page=0, size=10)
      const data = await propertyService.getAll({});

      setProperties(data.content);
    } catch (err) {
      console.error(err);
      setError(
        "Não foi possível carregar os imóveis. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Função utilitária para formatar moeda (BRL)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="user-info">
          <h1>Imobiliaria</h1>
          <button id="user-button">
            <UserCircleIcon size={40} />
          </button>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Busque aqui seu imóvel..." />
          <button onClick={fetchProperties}>Buscar</button>
        </div>
      </header>

      <main className="main-content">
        {loading && <div className="loading">Carregando imóveis...</div>}

        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="property-grid">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="card-header">
                  <span className="property-type">{property.type}</span>
                  <span className="property-id">#{property.id}</span>
                </div>

                <div className="card-body">
                  <h3>{property.name}</h3>
                  <p className="description">{property.description}</p>

                  <div className="property-details">
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>
                        {property.city} - {property.state}
                      </span>
                    </div>
                    <div className="detail-row">
                      <div className="detail-item">
                        <Bed size={16} /> {property.bedrooms} Quartos
                      </div>
                      <div className="detail-item">
                        <Ruler size={16} /> {property.area} m²
                      </div>
                    </div>
                  </div>

                  <div className="price-tag">
                    {formatCurrency(property.value)}
                  </div>

                  <div className="broker-info">
                    <small>Corretor: {property.brokerName}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
