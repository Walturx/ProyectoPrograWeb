const API_URL = "http://localhost:3005";

export const getProductos = async () => {
    const res = await fetch(`${API_URL}/producto`);
    if (!res.ok) throw new Error("Error al obtener productos");
    return res.json();
}

export const getProductoById = async (id) => {
    const res = await fetch(`${API_URL}/producto/${id}`);
    if (!res.ok) throw new Error("Error al obtener producto por ID");
    return res.json();
}

export const getCategorias = async () => {
    const res = await fetch(`${API_URL}/categoria`);
    if (!res.ok) throw new Error("Error al obtener categorias");
    return res.json();
}