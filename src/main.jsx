import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/homePage";
import Carrito from "./views/Carrito"
import ProductoPage from "./views/productPage";
import CatPage from "./views/categoriasPage";
import "./assets/index.css";
import Results from "./components/Results";
import SearchPage from "./views/searchPage";
import { CarritoProvider } from "./context/CarritoContexto";
import { EnvioProvider } from "./context/EnvioContext";

import LoginPage from "./views/LoginPage";
import RegistroPage from "./views/RegistroPage";
import OlvidePasswordPage from "./views/OlvidePasswordPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import UserDashboardPage from "./views/UserDashboardPage";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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

import DashboardAdminPage from "./views/Dashboard";
import ListaProductoPage from "./views/Lista_Prod";
import AgregarProductoPage from "./views/Agregar_Prod";
import ModProductoPage from "./views/Mod_Prod";

import Todas_Ordenes from './components/DashBoar/Front/Componentes/Todas_Ordenes'
import Detalles_Ordenes from './components/DashBoar/Front/Componentes/Detalles_Ordenes'
import Detalles_Usuarios from './components/DashBoar/Front/Componentes/Detalles_Usuarios'
import Usuarios from './components/DashBoar/Front/Componentes/Usuarios'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CarritoProvider>
        <EnvioProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/olvide-password" element={<OlvidePasswordPage />} />
              <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
              
              <Route path="/home" element={<HomePage />} />
              <Route path="/producto/:id" element={<ProductoPage />} />
              <Route path="/categorias/:categoria" element={<CatPage />} />
              <Route path="/search/:busqueda" element={<SearchPage />} />
              <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />

              <Route path="/usuario/:usuarioId" element={<DetalleUsuarioPage />} />
              <Route path="/usuario/:usuarioId/orden/:ordenId" element={<ProtectedRoute><DetalleOrdenPage /></ProtectedRoute>} />
              <Route path="/usuario/:usuarioId/cambiar-clave" element={<ProtectedRoute><CambiarClavePage /></ProtectedRoute>} />
              <Route path="/usuario/:usuarioId/listadoCategorias" element={<ListadoCategoriasPage />} />
              <Route path="/usuario/:usuarioId/listadoCategorias/crearCategoria" element={<CrearCategoriaPage />} />
              <Route path="/usuario/:usuarioId/listadoCategorias/editar/:id" element={<EditarCategoriaPage />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/metodo-pago" element={<ProtectedRoute><MetodoPago /></ProtectedRoute>} />
              <Route path="/pago-qr" element={<ProtectedRoute><PagoQR /></ProtectedRoute>} />
              <Route path="/pago-tarjeta" element={<ProtectedRoute><PagoTarjeta /></ProtectedRoute>} />
              <Route path="/pedido" element={<ProtectedRoute><Pedido /></ProtectedRoute>} />

              <Route path="/dashboard-admin" element={<ProtectedRoute><DashboardAdminPage /></ProtectedRoute>} />
              <Route path="/dashboard-admin/lista-productos" element={<ProtectedRoute><ListaProductoPage /></ProtectedRoute>} />
              <Route path="/dashboard-admin/agregar-producto" element={<ProtectedRoute><AgregarProductoPage /></ProtectedRoute>} />
              <Route path="/dashboard-admin/modificar-producto/:id" element={<ProtectedRoute><ModProductoPage /></ProtectedRoute>} />

              <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
              <Route path="/ordenes" element={<ProtectedRoute><Todas_Ordenes /></ProtectedRoute>} />
              <Route path="/detalles_Orden" element={<ProtectedRoute><Detalles_Ordenes /></ProtectedRoute>} />
              <Route path="/detalles_Usuario/:id" element={<ProtectedRoute><Detalles_Usuarios /></ProtectedRoute>} />
            </Routes>
          </Router>
        </EnvioProvider>

      </CarritoProvider>
    </UserProvider>
  </React.StrictMode>
);
