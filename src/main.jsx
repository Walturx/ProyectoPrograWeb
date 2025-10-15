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


import DetalleUsuarioPage from "./views/DetalleUsuarioPage";
import DetalleOrdenPage from "./views/DetalleOrdenPage";
import CambiarClavePage from "./views/CambiarClavePage";
import ListadoCategoriasPage from "./views/ListadoCategoriasPage";
import CrearCategoriaPage from "./views/CrearCategoriaPage";
import EditarCategoriaPage from "./views/EditarCategoriaPage"; 



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


        <Route path="/usuario/:usuarioId" element={<DetalleUsuarioPage />} />
          <Route path="/usuario/:usuarioId/orden/:ordenId" element={<DetalleOrdenPage />} />
          <Route path="/usuario/:usuarioId/cambiar-clave" element={<CambiarClavePage />} />
          <Route path="/usuario/:usuarioId/listadoCategorias" element={<ListadoCategoriasPage />} />
          <Route path="/usuario/:usuarioId/listadoCategorias/crearCategoria" element={<CrearCategoriaPage />} />
          <Route path="/usuario/:usuarioId/listadoCategorias/editar/:id" element={<EditarCategoriaPage />} /> {/* ruta para editar categoria */}

      </Routes>
    </Router>
    </StatePrice>
  </React.StrictMode>
);
