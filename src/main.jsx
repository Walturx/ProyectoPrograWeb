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

import DetalleUsuario from "./components/DetalleUsuario/DetalleUsuario";
import DetalleOrden from "./components/DetalleOrden/DetalleOrden";
import CambiarClave from "./components/CambiarClave/CambiarClave";
import ListadoCategorias from "./components/ListadoCategorias/ListadoCategorias";
import CrearCategoria from "./components/CrearCategoria/CrearCategoria";
import EditarCategoria from "./components/EditarCategoria/EditarCategoria"; 

import { UserProvider } from "./context/UserContext";
import LoginPage from "./views/LoginPage";
import RegistroPage from "./views/RegistroPage";
import OlvidePasswordPage from "./views/OlvidePasswordPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import UserDashBoardPage from "./views/UserDashboardPage";

//probando subida de rama
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <StatePrice>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producto/:id" element={<ProductoPage />} />
          <Route path="/categorias/:categoria" element={<CatPage />} />
          <Route path="/search/:busqueda" element={<SearchPage/>} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/olvide-password" element={<OlvidePasswordPage />} />
          <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
          <Route path="/mi-cuenta" element={<UserDashBoardPage />} />


          <Route path="/usuario/:usuarioId" element={<DetalleUsuario />} />
          <Route path="/usuario/:usuarioId/orden/:ordenId" element={<DetalleOrden />} />
          <Route path="/usuario/:usuarioId/cambiar-clave" element={<CambiarClave />} />
          <Route path="/usuario/:usuarioId/listadoCategorias" element={<ListadoCategorias />} />
          <Route path="/usuario/:usuarioId/listadoCategorias/crearCategoria" element={<CrearCategoria />} />
          <Route path="/usuario/:usuarioId/listadoCategorias/editar/:id" element={<EditarCategoria />} /> {/* ruta para editar categoria */}

        </Routes>
      </Router>
      </StatePrice>
    </UserProvider>
  </React.StrictMode>
);
