import { Card, CardContent, Typography, Box } from "@mui/material";
import { BedDouble } from "lucide-react";
import { Link } from "react-router-dom";

type PropertyCardProps = {
  id: number;
  nome: string;
  address: string;
  city: string;
  state: string;
  area: number;
  bedrooms: number;
  value: number;
};

const PropertyCard = ({
  id,
  nome,
  address,
  city,
  state,
  area,
  bedrooms,
  value,
}: PropertyCardProps) => {
  return (
    <Card sx={{ maxWidth: 360, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        {/* nome do imóvel */}
        <Typography
          variant="h6"
          fontWeight="bold"
          component={Link}
          to={`/property/${id}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            "&:hover": { color: "primary.main" },
          }}
        >
          {nome}
        </Typography>

        {/* endereço */}
        <Typography variant="body2" color="text.secondary" mb={1}>
          {address}, {city} - {state}
        </Typography>

        {/* quartos + area */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <BedDouble size={18} />
            <Typography variant="body2">{bedrooms}</Typography>
          </Box>

          <Typography variant="body2">{area} m²</Typography>
        </Box>

        {/* valor */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="primary">
            R$ {value.toLocaleString("pt-BR")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
