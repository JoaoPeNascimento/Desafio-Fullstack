import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4e00",
      light: "#ff4e00",
      dark: "#cc3e00",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0", // roxo
    },
    success: {
      main: "#2e7d32",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#f4f6f8",
    },
  },
});
