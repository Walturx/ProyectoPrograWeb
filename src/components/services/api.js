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

// ---------- ADMIN ----------
export const createProducto = async ({ nombre, presentacion, categoria, descripcion, imagen, stock }) => {
  const res = await fetch(`${API_URL}/admin/productos/agregar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, presentacion, categoria, descripcion, imagen, stock }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al crear producto");
  return data;
};

export const updateProducto = async ({ id, nombre, presentacion, categoria, descripcion, imagen, stock }) => {
  const res = await fetch(`${API_URL}/admin/productos/modificar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nombre, presentacion, categoria, descripcion, imagen, stock }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al actualizar producto");
  return data;
};

export const deleteProducto = async (id) => {
  const res = await fetch(`${API_URL}/admin/productos/eliminar/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar producto");
  return data;
};

export const AllProductos = async () => {
  const res = await fetch(`${API_URL}/admin/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};
