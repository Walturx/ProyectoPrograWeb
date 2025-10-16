import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/homePage";
import Carrito from "./views/Carrito"
import ProductoPage from "./views/productPage";
import CatPage from "./views/categoriasPage";
import "./assets/index.css";
import { StatePrice } from "./data/priceState";
import Results from "./components/Results";
import SearchPage from "./views/searchPage";
import { CarritoProvider } from "./context/CarritoContexto";
import { EnvioProvider } from "./context/EnvioContext";


import DetalleUsuarioPage from "./views/DetalleUsuarioPage";
import DetalleOrdenPage from "./views/DetalleOrdenPage";
import CambiarClavePage from "./views/CambiarClavePage";
import ListadoCategoriasPage from "./views/ListadoCategoriasPage";
import CrearCategoriaPage from "./views/CrearCategoriaPage";
import EditarCategoriaPage from "./views/EditarCategoriaPage";
import Checkout from './views/Checkout';
import MetodoPago from './views/Metodo_Pago';
import PagoQR from './views/Pago_qr';
import PagoTarjeta from './views/Pago_Tarjeta';
import Pedido from './views/Pedido';
import { Navigate } from "react-router-dom"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StatePrice>
      <CarritoProvider>
        <EnvioProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/producto/:id" element={<ProductoPage />} />
              <Route path="/categorias/:categoria" element={<CatPage />} />
              <Route path="/search/:busqueda" element={<SearchPage />} />
              <Route path="/carrito" element={<Carrito />} />

              <Route path="/usuario/:usuarioId" element={<DetalleUsuarioPage />} />
              <Route path="/usuario/:usuarioId/orden/:ordenId" element={<DetalleOrdenPage />} />
              <Route path="/usuario/:usuarioId/cambiar-clave" element={<CambiarClavePage />} />
              <Route path="/usuario/:usuarioId/listadoCategorias" element={<ListadoCategoriasPage />} />
              <Route path="/usuario/:usuarioId/listadoCategorias/crearCategoria" element={<CrearCategoriaPage />} />
              <Route path="/usuario/:usuarioId/listadoCategorias/editar/:id" element={<EditarCategoriaPage />} /> {/* ruta para editar categoria */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/metodo-pago" element={<MetodoPago />} />
              <Route path="/pago-qr" element={<PagoQR />} />
              <Route path="/pago-tarjeta" element={<PagoTarjeta />} />
              <Route path="/pedido" element={<Pedido />} />

            </Routes>
          </Router>
        </EnvioProvider>

      </CarritoProvider>

    </StatePrice>
  </React.StrictMode>
);
