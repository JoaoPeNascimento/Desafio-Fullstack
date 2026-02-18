import { useEffect, useState } from "react";
import "./Home.css";
import { propertyService } from "../services/propertyService";
import { PropertyDTO, PropertyFilter } from "../types/property";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";
import { Button, Pagination } from "@mui/material";
import { FilterIcon } from "lucide-react";
import PropertyFilterDialog from "../components/PropertyFilterDialog"; // Importe o novo componente
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const role = useAuthStore((state) => state.role);
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState<PropertyFilter>({
    name: "",
    type: undefined,
    minValue: undefined,
    maxValue: undefined,
    minBedrooms: undefined,
  });

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const fetchProperties = async (
    filtersToApply?: PropertyFilter,
    pageToApply: number = page,
  ) => {
    try {
      setLoading(true);

      const params = filtersToApply || filters;

      const data = await propertyService.getAll(params, pageToApply, size);

      setProperties(data.content);
      setTotalElements(data.totalElements);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Não foi possível carregar os imóveis.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchProperties();
    }
  };

  const handleApplyFiltersFromDialog = (newFilters: PropertyFilter) => {
    setFilters(newFilters);
    setPage(0);
    fetchProperties(newFilters);
    setFilterOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <div className="search-container">
          <input
            type="text"
            placeholder="Busque aqui seu imóvel..."
            value={filters.name || ""}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => fetchProperties()}>Buscar</button>
        </div>
      </header>

      <main className="main-content">
        <img src="/banner.svg" alt="Banner de Imóveis" className="banner" />

        {error && <div className="error">{error}</div>}

        <div className="filter-container">
          <h3>Imóveis Disponíveis: {totalElements}</h3>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setFilterOpen(true)}
          >
            <FilterIcon style={{ marginRight: "5px" }} />
            Filtrar
          </Button>
        </div>

        {loading ? (
          <div className="loading">Carregando imóveis...</div>
        ) : (
          <div className="property-grid">
            {properties
              .filter(
                (property) => role === "ADMIN" || property.active === true,
              )
              .map((property) => (
                <PropertyCard
                  nome={property.name}
                  key={property.id}
                  {...property}
                />
              ))}
          </div>
        )}
      </main>
      <footer className="page-footer">
        <Pagination
          count={Math.ceil(totalElements / size)}
          page={page + 1}
          onChange={(_, value) => setPage(value - 1)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </footer>

      <PropertyFilterDialog
        open={filterOpen}
        currentFilters={filters}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFiltersFromDialog}
      />
    </div>
  );
};

export default Home;
