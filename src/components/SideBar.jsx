import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from "../ui/sidebar-adaptado"; // ⬅ tu nuevo sistema

export default function SidebarApp({ open, setOpen }) {
  const navigate = useNavigate();
  const { user } = useUser();

  const go = (path) => {
    navigate(path);
    if (setOpen) setOpen(false); // cierra en mobile
  };

  const isAdmin =
    user && (user.admin === 1 || user.admin === true || user.admin === "1");

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="p-4">

        {/* ================================
              HEADER (solo en mobile)
        ================================= */}
        <div className="md:hidden mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Menú</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* ================================
                USER INFO
        ================================= */}
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

        {/* ================================
                GENERAL
        ================================= */}
        <SectionTitle text="General" />

        <SidebarLink onClick={() => go("/home")}>🏠 Página principal</SidebarLink>

        <SidebarLink onClick={() => go("/categorias/Consolas")}>
          🧩 Categorías (tienda)
        </SidebarLink>

        {/* ================================
                MI COMPRA
        ================================= */}
        {user && (
          <>
            <SectionTitle text="Mi compra" />

            <SidebarLink onClick={() => go("/carrito")}>🛒 Carrito</SidebarLink>
            <SidebarLink onClick={() => go("/checkout")}>✅ Checkout</SidebarLink>
            <SidebarLink onClick={() => go("/metodo-pago")}>💳 Método de pago</SidebarLink>
            <SidebarLink onClick={() => go("/pago-qr")}>📱 Pago QR</SidebarLink>
            <SidebarLink onClick={() => go("/pago-tarjeta")}>
              🧾 Pago con tarjeta
            </SidebarLink>
            <SidebarLink onClick={() => go("/pedido")}>
              📦 Pedido completo
            </SidebarLink>
          </>
        )}

        {/* ================================
                MI CUENTA
        ================================= */}
        {user && (
          <>
            <SectionTitle text="Mi cuenta" />

            <SidebarLink onClick={() => go("/dashboard")}>
              👤 Panel de usuario
            </SidebarLink>
            <SidebarLink onClick={() => go(`/usuario/${user.id}`)}>
              📄 Mis datos
            </SidebarLink>
            <SidebarLink
              onClick={() => go(`/usuario/${user.id}/cambiar-clave`)}
            >
              🔑 Cambiar contraseña
            </SidebarLink>
            <SidebarLink onClick={() => go("/pedido")}>📦 Mis órdenes</SidebarLink>
          </>
        )}

        {/* ================================
                ADMIN
        ================================= */}
        {isAdmin && (
          <>
            <SectionTitle text="Administración" />

            <SidebarLink onClick={() => go("/dashboard-admin")}>
              📊 Dashboard Admin
            </SidebarLink>

            <SidebarLink onClick={() => go("/admin/productos")}>
              🎮 Lista de productos
            </SidebarLink>

            <SidebarLink onClick={() => go("/admin/productos/agregar")}>
              ➕ Agregar producto
            </SidebarLink>

            <SidebarLink onClick={() => go("/admin/usuarios")}>
              👥 Lista de usuarios
            </SidebarLink>

            <SidebarLink onClick={() => go("/admin/ordenes")}>
              📑 Lista de órdenes
            </SidebarLink>

            <SidebarLink onClick={() => go("/admin/Detalles_Orden")}>
              📘 Detalle de orden (Admin)
            </SidebarLink>

            <SidebarLink
              onClick={() => go(`/admin/${user.id}/categorias`)}
            >
              🗂 Lista de categorías
            </SidebarLink>

            <SidebarLink
              onClick={() => go(`/admin/${user.id}/categorias/crear`)}
            >
              ➕ Agregar categoría
            </SidebarLink>
          </>
        )}
      </SidebarBody>
    </Sidebar>
  );
}

/* ============================================
    HELPERS
=============================================== */

function SectionTitle({ text }) {
  return (
    <p className="text-xs text-gray-500 uppercase mb-1 mt-2 pl-2">
      {text}
    </p>
  );
}
