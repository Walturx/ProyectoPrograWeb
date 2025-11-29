// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!open) return null;

  const go = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  // admin puede venir como 1, true, "1", etc.
  const isAdmin =
    user && (user.admin === 1 || user.admin === true || user.admin === "1");

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Fondo oscuro para cerrar al hacer click */}
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      {/* Panel lateral */}
      <aside className="relative bg-white w-72 h-full shadow-xl p-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Menú</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Info de usuario */}
        {user && (
          <div className="flex items-center gap-3 mb-4 border-b pb-3">
            {user.imagen && (
              <img
                src={user.imagen}
                alt={user.nombre}
                className="w-10 h-10 rounded-full border"
              />
            )}
            <div>
              <p className="font-semibold text-sm">{user.nombre}</p>
              <p className="text-xs text-gray-500">
                {isAdmin ? "Administrador" : "Cliente"}
              </p>
            </div>
          </div>
        )}

        {/* ===== GENERAL / TIENDA (basado en rutas públicas) ===== */}
        <p className="text-xs text-gray-500 uppercase mb-1">General</p>

        <button
          className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
          onClick={() => go("/home")}
        >
          🏠 Página principal
        </button>

        {/* Alguna categoría por defecto */}
        <button
          className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
          onClick={() => go("/categorias/Consolas")}
        >
          🧩 Categorías (tienda)
        </button>

        {/* El detalle de producto y /search/:busqueda se acceden desde cards / barra de búsqueda */}
        <br />

        {/* ===== MI COMPRA (todas son ProtectedRoute en main.jsx) ===== */}
        {user && (
          <>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Mi compra
            </p>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/carrito")}
            >
              🛒 Carrito
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/checkout")}
            >
              ✅ Checkout
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/metodo-pago")}
            >
              💳 Método de pago
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/pago-qr")}
            >
              📱 Pago QR
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/pago-tarjeta")}
            >
              🧾 Pago con tarjeta
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-3"
              onClick={() => go("/pedido")}
            >
              📦 Pedido completo
            </button>
          </>
        )}

        {/* ===== MI CUENTA (Usuario registrado) ===== */}
        {user && (
          <>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Mi cuenta
            </p>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/dashboard")}
            >
              👤 Panel de usuario
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go(`/usuario/${user.id}`)}
            >
              📄 Mis datos
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go(`/usuario/${user.id}/cambiar-clave`)}
            >
              🔑 Cambiar contraseña
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-3"
              onClick={() => go("/pedido")}
            >
              📦 Mis órdenes
            </button>

            {/* El detalle de una orden específica:
                /usuario/:usuarioId/orden/:ordenId
                se accede desde la lista, no hace falta botón directo aquí.
            */}
          </>
        )}

        {/* ===== ADMINISTRACIÓN (solo si es admin) ===== */}
        {isAdmin && (
          <>
            <p className="text-xs text-gray-500 uppercase mb-1">
              Administración
            </p>

            {/* Dashboard Admin */}
            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/dashboard-admin")}
            >
              📊 Dashboard Admin
            </button>

            {/* Productos */}
            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/admin/productos")}
            >
              🎮 Lista de productos
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/admin/productos/agregar")}
            >
              ➕ Agregar producto
            </button>
            {/* /admin/productos/modificar/:id se entra desde la lista */}

            {/* Usuarios */}
            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/admin/usuarios")}
            >
              👥 Lista de usuarios
            </button>
            {/* /admin/detalles_usuario/:id se entra desde tabla Usuarios */}

            {/* Órdenes */}
            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/admin/ordenes")}
            >
              📑 Lista de órdenes
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go("/admin/Detalles_Orden")}
            >
              📘 Detalle de orden (Admin)
            </button>

            {/* Categorías */}
            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go(`/admin/${user.id}/categorias`)}
            >
              🗂 Lista de categorías
            </button>

            <button
              className="w-full text-left px-2 py-1 rounded-md text-sm hover:bg-gray-100 mb-1"
              onClick={() => go(`/admin/${user.id}/categorias/crear`)}
            >
              ➕ Agregar categoría
            </button>
            {/* /admin/:usuarioId/categorias/editar/:id se entra desde la tabla */}
          </>
        )}
      </aside>
    </div>
  ); 
}
