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
export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuario`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

export const getUsuarioById = async (id) => {
  const res = await fetch(`${API_URL}/usuario/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
};

export const cambiarEstadoUsuario = async (id, nuevoEstado) => {
  const res = await fetch(`${API_URL}/usuario/${id}/estado`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });
  if (!res.ok) throw new Error("Error al actualizar estado");
  return await res.json(); 
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

// Crear nueva orden
export const createOrden = async (orden) => {
  try {
    const res = await fetch(`${API_URL}/orden`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orden),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("El servidor backend no está disponible. Asegúrate de que esté corriendo en el puerto 3005.");
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al crear orden");
    return data;
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("No se puede conectar al servidor backend. Verifica que esté corriendo en http://localhost:3005");
    }
    throw error;
  }
};

// Crear nuevo usuario (registro)
export const createUsuario = async (usuario) => {
  try {
    const res = await fetch(`${API_URL}/usuario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    // Verificar si la respuesta es JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("El servidor backend no está disponible. Asegúrate de que esté corriendo en el puerto 3005.");
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error al crear usuario");
    return data;
  } catch (error) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error("No se puede conectar al servidor backend. Verifica que esté corriendo en http://localhost:3005");
    }
    throw error;
  }
};
