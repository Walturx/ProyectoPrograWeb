import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./views/HomePage";
import ProductoPage from "./views/productPage"; 
import CatPage from "./views/categoriasPage"; 
import "./assets/index.css";
import { StatePrice } from "./data/priceState";
import Results from "./components/Results";
import SearchPage from "./views/searchPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StatePrice>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producto/:id" element={<ProductoPage />} />
        <Route path="/categorias/:categoria" element={<CatPage />} />
        <Route path="/search/:busqueda" element={<SearchPage/>} />

      </Routes>
    </Router>
    </StatePrice>
  </React.StrictMode>
);
