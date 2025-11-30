// src/components/services/api.js
const API_URL = "http://localhost:3005";

// Lo exporto por si algún componente lo quiere usar directo
export { API_URL };

// ---------- PRODUCTOS ----------
export const getProductos = async () => {
  const res = await fetch(`${API_URL}/producto`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const getProductoById = async (id) => {
  const res = await fetch(`${API_URL}/producto/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto por ID");
  return res.json();
};

// ---------- CATEGORÍAS ----------
export const getCategorias = async () => {
  const res = await fetch(`${API_URL}/categoria`);
  if (!res.ok) throw new Error("Error al obtener categorías");
  return res.json();
};

export const getCategoriaById = async (id) => {
  const res = await fetch(`${API_URL}/categoria/${id}`);
  if (!res.ok) throw new Error("Error al obtener categoría");
  return res.json();
};

export const createCategoria = async ({ categoria, descripcion, imagenCat }) => {
  const res = await fetch(`${API_URL}/categoria`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoria, descripcion, imagenCat }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear categoría");
  return data;
};

export const updateCategoria = async ({ id, categoria, descripcion, imagenCat }) => {
  const res = await fetch(`${API_URL}/categoria`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, categoria, descripcion, imagenCat }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al actualizar categoría");
  return data;
};

export const deleteCategoria = async (id) => {
  const res = await fetch(`${API_URL}/categoria/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar categoría");
  return data;
};

// ---------- USUARIOS ----------
export const getUsuarioById = async (id) => {
  const res = await fetch(`${API_URL}/usuario/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
};

// Cambiar contraseña
export const cambiarPasswordUsuario = async (id, passwordActual, passwordNueva) => {
  const res = await fetch(`${API_URL}/usuario/${id}/password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passwordActual, passwordNueva }),
  });
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || "Error al cambiar contraseña");
  }
  return data;
};

// ---------- ÓRDENES ----------
export const getOrdenes = async () => {
  const res = await fetch(`${API_URL}/orden`);
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
};

export const getOrdenById = async (id) => {
  const res = await fetch(`${API_URL}/orden/${id}`);
  if (!res.ok) throw new Error("Error al obtener detalle de orden");
  return res.json();
};

export const crearOrden = async (ordenData) => {
  const res = await fetch(`${API_URL}/orden`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ordenData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear orden");

  return data;
};


// ---------- CARRITO DE COMPRA ----------
export const getCarritoByUsuario = async (idusuario) => {
  const res = await fetch(`${API_URL}/carrito/usuario/${idusuario}`);
  if (!res.ok) throw new Error("Error al obtener carrito del usuario");
  return res.json();
};

export const crearCarrito = async (idusuario) => {
  const res = await fetch(`${API_URL}/carrito`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idusuario }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear carrito");

  return data;
};

export const eliminarCarrito = async (idcarrito) => {
  const res = await fetch(`${API_URL}/carrito/${idcarrito}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar carrito");

  return data;
};

// ---------- ITEMS DEL CARRITO ----------
export const getItemsDeCarrito = async (idcarrito) => {
  const res = await fetch(`${API_URL}/itemcarrito/carrito/${idcarrito}`);
  if (!res.ok) throw new Error("Error al obtener items del carrito");
  return res.json(); // { success, data }
};

export const agregarItemCarrito = async ({ idcarrito, idproducto, cantidad }) => {
  const res = await fetch(`${API_URL}/itemcarrito`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idcarrito, idproducto, cantidad }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al agregar item");

  return data;
};

export const eliminarItemCarrito = async (iditem) => {
  const res = await fetch(`${API_URL}/itemcarrito/${iditem}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar item");

  return data;
};

// ---------- ITEMS DE LA ORDEN ----------
export const getItemsDeOrden = async (idorden) => {
  const res = await fetch(`${API_URL}/itemorden/${idorden}`);
  if (!res.ok) throw new Error("Error al obtener items de la orden");
  return res.json();
};

export const crearItemDeOrden = async ({ idorden, idproducto, cantidad, preciounitario }) => {
  const res = await fetch(`${API_URL}/itemorden`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idorden, idproducto, cantidad, preciounitario }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear item");

  return data;
};
