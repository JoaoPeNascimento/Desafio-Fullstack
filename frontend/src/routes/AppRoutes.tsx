import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PropertyDetails from "../pages/PropertyDetails";
import UserPage from "../pages/User";
import FavoritePage from "../pages/FavoritePage";
import PropertiesPage from "../pages/PropertiesPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
