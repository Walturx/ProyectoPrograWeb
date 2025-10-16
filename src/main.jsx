//Codigo hecho por Walter Melendez 20231805

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- CONTEXTOS ---
import { CarritoProvider } from "./context/CarritoContexto";
import { EnvioProvider } from "./context/EnvioContext";
import { UserProvider } from "./context/UserContext";

// --- GUARDIAS DE SEGURIDAD ---
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute"; // <-- Importamos el guardia VIP

// --- VISTAS / PÁGINAS ---
// Públicas y de Tienda
import HomePage from "./views/homePage";
import ProductoPage from "./views/productPage";
import CatPage from "./views/categoriasPage";
import SearchPage from "./views/searchPage";
// Autenticación
import LoginPage from "./views/LoginPage";
import RegistroPage from "./views/RegistroPage";
import OlvidePasswordPage from "./views/OlvidePasswordPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
// Usuario Registrado
import UserDashboardPage from "./views/UserDashboardPage";
import Carrito from "./views/Carrito";
import Checkout from './views/Checkout';
import MetodoPago from './views/Metodo_Pago';
import PagoQR from './views/Pago_qr';
import PagoTarjeta from './views/Pago_Tarjeta';
import Pedido from './views/Pedido';
import CambiarClavePage from "./views/CambiarClavePage";
import DetalleOrdenPage from "./views/DetalleOrdenPage";
// Admin
import DashboardAdminPage from "./views/Dashboard";
import ListaProductoPage from "./views/Lista_Prod";
import AgregarProductoPage from "./views/Agregar_Prod";
import ModProductoPage from "./views/Mod_Prod";
import DetalleUsuarioPage from "./views/DetalleUsuarioPage";
import ListadoCategoriasPage from "./views/ListadoCategoriasPage";
import CrearCategoriaPage from "./views/CrearCategoriaPage";
import EditarCategoriaPage from "./views/EditarCategoriaPage";
// Nuevas rutas de Admin que faltaban
import Todas_Ordenes from './components/DashBoar/Front/Componentes/Todas_Ordenes';
import Detalles_Ordenes from './components/DashBoar/Front/Componentes/Detalles_Ordenes';
import Detalles_Usuarios from './components/DashBoar/Front/Componentes/Detalles_Usuarios';
import Usuarios from './components/DashBoar/Front/Componentes/Usuarios';

import "./assets/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <CarritoProvider>
        <EnvioProvider>
          <Router>
            <Routes>
              {/* === 1. RUTAS PÚBLICAS === */}
              <Route path="/" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/olvide-password" element={<OlvidePasswordPage />} />
              <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/producto/:id" element={<ProductoPage />} />
              <Route path="/categorias/:categoria" element={<CatPage />} />
              <Route path="/search/:busqueda" element={<SearchPage />} />

              {/* === 2. RUTAS DE USUARIO REGISTRADO === */}
              <Route path="/dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
              <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/metodo-pago" element={<ProtectedRoute><MetodoPago /></ProtectedRoute>} />
              <Route path="/pago-qr" element={<ProtectedRoute><PagoQR /></ProtectedRoute>} />
              <Route path="/pago-tarjeta" element={<ProtectedRoute><PagoTarjeta /></ProtectedRoute>} />
              <Route path="/pedido" element={<ProtectedRoute><Pedido /></ProtectedRoute>} />
              <Route path="/usuario/:usuarioId/orden/:ordenId" element={<ProtectedRoute><DetalleOrdenPage /></ProtectedRoute>} />
              <Route path="/usuario/:usuarioId/cambiar-clave" element={<ProtectedRoute><CambiarClavePage /></ProtectedRoute>} />

              {/* === 3. RUTAS DE ADMINISTRADOR === */}
              {/* Dashboard y Mantenimiento de Productos */}
              <Route path="/dashboard-admin" element={<AdminRoute><DashboardAdminPage /></AdminRoute>} />
              <Route path="/admin/productos" element={<AdminRoute><ListaProductoPage /></AdminRoute>} />
              <Route path="/admin/productos/agregar" element={<AdminRoute><AgregarProductoPage /></AdminRoute>} />
              <Route path="/admin/productos/modificar/:id" element={<AdminRoute><ModProductoPage /></AdminRoute>} />
              
              {/* Mantenimiento de Usuarios */}
              <Route path="/admin/usuarios" element={<AdminRoute><Usuarios /></AdminRoute>} />
              <Route path="/admin/usuario/:usuarioId" element={<AdminRoute><DetalleUsuarioPage /></AdminRoute>} />
              <Route path="/admin/detalles_usuario/:id" element={<AdminRoute><Detalles_Usuarios /></AdminRoute>} />

              {/* Mantenimiento de Órdenes */}
              <Route path="/admin/ordenes" element={<AdminRoute><Todas_Ordenes /></AdminRoute>} />
              <Route path="/admin/Detalles_Orden" element={<AdminRoute><Detalles_Ordenes /></AdminRoute>} />

              {/* Mantenimiento de Categorías */}
              <Route path="/admin/categorias" element={<AdminRoute><ListadoCategoriasPage /></AdminRoute>} />
              <Route path="/admin/categorias/crear" element={<AdminRoute><CrearCategoriaPage /></AdminRoute>} />
              <Route path="/admin/categorias/editar/:id" element={<AdminRoute><EditarCategoriaPage /></AdminRoute>} />

            </Routes>
          </Router>
        </EnvioProvider>
      </CarritoProvider>
    </UserProvider>
  </React.StrictMode>
);