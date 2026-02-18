import { useEffect, useState } from "react";
import Header from "../components/Header";
import { PropertyDTO } from "../types/property";
import { userService } from "../services/userService";
import PropertyCard from "../components/PropertyCard";
import "./FavoritePage.css";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);

        const data = await userService.getFavorites();
        setFavorites(data);
      } catch (err) {
        setError("Erro ao carregar os favoritos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="Favorite-page">
      <Header />
      {loading && <div className="loading">Carregando imóveis...</div>}
      {error && <div className="error">{error}</div>}
      <main>
        <h2>Meus Favoritos</h2>
        {favorites.length === 0 ? (
          <p>Você ainda não tem imóveis favoritos.</p>
        ) : (
          <div className="Favorite-grid">
            {favorites.map((property) => (
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

export default FavoritePage;
