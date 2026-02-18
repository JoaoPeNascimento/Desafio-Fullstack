import {
  BuildingIcon,
  HeartIcon,
  LogOutIcon,
  User2Icon,
  UserCircleIcon,
} from "lucide-react";
import "./Header.css";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const role = useAuthStore((state) => state.role);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    useAuthStore.getState().logout();
    navigate("/");
  };

  const handleFavoritesPage = () => {
    handleClose();
    navigate("/favorites");
  };

  const handlePropertiesPage = () => {
    handleClose();
    navigate("/properties");
  };

  const handleUserPage = () => {
    handleClose();
    navigate("/user");
  };

  return (
    <header className="App-header">
      <div className="user-info">
        <Link to="/home" className="logo-link">
          <h1>IMOBILIARIA</h1>
        </Link>
        <Button
          id="user-btn"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <UserCircleIcon size={40} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleUserPage} divider className="menu-item">
            <User2Icon size={16} className="menu-icon" />
            Perfil
          </MenuItem>
          {role === "CLIENTE" && (
            <MenuItem
              onClick={handleFavoritesPage}
              className="menu-item"
              divider
            >
              <HeartIcon size={16} className="menu-icon" />
              Meus favoritos
            </MenuItem>
          )}
          {role !== "CLIENTE" && (
            <MenuItem
              onClick={handlePropertiesPage}
              className="menu-item"
              divider
            >
              <BuildingIcon size={16} className="menu-icon" />
              Meus imóveis
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout} className="menu-item">
            <LogOutIcon size={16} className="logout-icon" />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
