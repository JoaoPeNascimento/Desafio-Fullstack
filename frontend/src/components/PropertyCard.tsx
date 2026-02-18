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
  imageUrls: string;
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
  imageUrls,
}: PropertyCardProps) => {
  const mainImage = imageUrls?.split(",")[0];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* IMAGEM */}
        <Box
          component="img"
          src={mainImage}
          alt={nome}
          sx={{
            width: 120,
            height: 100,
            objectFit: "cover",
            borderRadius: 2,
            flexShrink: 0,
          }}
        />

        {/* CONTEÚDO */}
        <Box flex={1}>
          <Typography
            variant="h6"
            fontWeight="bold"
            component={Link}
            to={`/property/${id}`}
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { color: "primary.main" },
            }}
          >
            {nome}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={1}>
            {address}, {city} - {state}
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <BedDouble size={18} />
              <Typography variant="body2">{bedrooms}</Typography>
            </Box>

            <Typography variant="body2">{area} m²</Typography>
          </Box>

          <Typography variant="h6" fontWeight="bold" color="primary">
            R$ {value.toLocaleString("pt-BR")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
