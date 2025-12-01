// src/components/services/api.js
const API_URL = "http://localhost:3005";

// Lo exporto por si algún componente lo quiere usar directo
export { API_URL };

//para tener el token
const getToken = () => {
  return localStorage.getItem("token");
}

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
  token = getToken();

  const res = await fetch(`${API_URL}/categoria/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  );
  if (!res.ok) throw new Error("Error al obtener categoría");
  return res.json();
};

export const createCategoria = async ({ categoria, descripcion, imagenCat }) => {
  const res = await fetch(`${API_URL}/categoria`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoria, descripcion, imagenCat }),
  });

  // Verificar si la respuesta es JSON
  const contentType = res.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    data = { message: text };
  }

  if (!res.ok) throw new Error(data.message || "Error al crear categoría");
  return data;
};

export const updateCategoria = async ({ id, categoria, descripcion, imagenCat }) => {
  const res = await fetch(`${API_URL}/categoria`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, categoria, descripcion, imagenCat }),
  });

  // Verificar si la respuesta es JSON
  const contentType = res.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    data = { message: text };
  }

  if (!res.ok) throw new Error(data.message || "Error al actualizar categoría");
  return data;
};

export const deleteCategoria = async (id) => {
  const res = await fetch(`${API_URL}/categoria/${id}`, {
    method: "DELETE",
  });

  // Verificar si la respuesta es JSON
  const contentType = res.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    data = { message: text };
  }

  if (!res.ok) throw new Error(data.message || "Error al eliminar categoría");
  return data;
};

// ---------- USUARIOS ----------
export const getUsuarios = async () => {
  const token = getToken();

  const res = await fetch(`${API_URL}/usuario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  const data = await res.json();

  // Es bueno incluir el mensaje de error del servidor si existe
  if (!res.ok) throw new Error(data.message || "Error al obtener usuarios");

  // Devuelve el array de datos, asumiendo que tu backend lo envía en data.data
  return data.data || data;
};

export const getUsuarioById = async (id) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/usuario/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
};

export const cambiarEstadoUsuario = async (id, nuevoEstado) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/usuario/${id}/estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ estado: nuevoEstado })
  });
  if (!res.ok) throw new Error("Error al actualizar estado");
  return await res.json();
};

// Cambiar contraseña
export const cambiarPasswordUsuario = async (id, passwordActual, passwordNueva) => {
  const token = localStorage.getItem("token"); // Recuperamos el token

  const res = await fetch(`${API_URL}/usuario/${id}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // ¡Agregamos el token!
    },
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
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orden/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Error al obtener detalle de orden");
  return res.json();
};

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

export const getItemsByOrden = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/itemorden/orden/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error("Error al obtener órdenes");
  }
  const data = await res.json();

  return data.data;
}

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

export const getOrdenByIdUsuario = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orden/usuario/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    // Si el usuario no tiene órdenes, a veces el backend puede devolver 404.
    // Para que no rompa el front, devolvemos un array vacío.
    if (res.status === 404) return [];
    throw new Error("Error al obtener órdenes");
  }

  return res.json();
};

export const loginUsuario = async (credenciales) => {
  // credenciales es un objeto: { email, password }
  const res = await fetch(`${API_URL}/usuario/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credenciales),
  });

  const data = await res.json();

  // Si el backend devuelve error (status != 200), lanzamos el error
  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  return data; // Retorna lo que envía tu backend: { success, token, usuario }
};

export const solicitarRecuperacion = async (email) => {
  const res = await fetch(`${API_URL}/usuario/recuperar-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al solicitar recuperación");
  return data;
};

// 2. Restablecer contraseña (Guarda la nueva contraseña)
export const restablecerPassword = async (email, newPassword) => {
  const res = await fetch(`${API_URL}/usuario/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al restablecer contraseña");
  return data;
};


// Crear nuevo usuario (registro)
export const createUsuario = async (usuario) => {
  try {
    const res = await fetch(`${API_URL}/usuario/registrar`, {
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

// ---------- ADMIN PRODUCTOS ----------
export const createProducto = async ({ nombre, presentacion, categoria, descripcion, imagen, stock, precio }) => {
  const res = await fetch(`${API_URL}/producto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, presentacion, categoria, idCategoria: categoria, descripcion, imagen, stock, precio }),
  });

  // Verificar si la respuesta es JSON
  const contentType = res.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    // Si no es JSON, leer como texto
    const text = await res.text();
    data = { message: text };
  }

  if (!res.ok) throw new Error(data.message || "Error al crear producto");
  return data;
};

export const updateProducto = async ({ id, nombre, presentacion, categoria, descripcion, imagen, stock, precio }) => {
  const res = await fetch(`${API_URL}/producto`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nombre, presentacion, categoria, descripcion, imagen, stock, precio }),
  });

  // Verificar si la respuesta es JSON
  const contentType = res.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    data = { message: text };
  }

  if (!res.ok) throw new Error(data.message || "Error al actualizar producto");
  return data;
};

export const deleteProducto = async (id) => {
  const res = await fetch(`${API_URL}/producto/${id}`, {
    method: "DELETE",
  });

  // Verificar si la respuesta es JSON
  const contentType = res.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    // Si no es JSON, leer como texto
    const text = await res.text();
    data = { message: text };
  }

  if (!res.ok) throw new Error(data.message || "Error al eliminar producto");
  return data;
};

export const AllProductos = async () => {
  const res = await fetch(`${API_URL}/producto`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};
