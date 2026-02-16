import React from "react";
import "./Home.css";
import { UserCircleIcon } from "lucide-react";

const home = () => {
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
          <button>Buscar</button>
        </div>
      </header>
    </div>
  );
};

export default home;
