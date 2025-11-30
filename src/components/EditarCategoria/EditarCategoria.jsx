
//hecho por Jean Carlo Rado-(202235056) [adaptado a backend]

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategoriaById,
  updateCategoria,
} from "../services/api";
import "./EditarCategoria.css";

export default function EditarCategoria() {
  const { usuarioId, id } = useParams();
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    const cargarCategoria = async () => {
      try {
        const cat = await getCategoriaById(id);
        setNombre(cat.categoria);
        setDescripcion(cat.descripcion || "");
        setImagen(cat.imagenCat || "");
      } catch (error) {
        console.error("Error al obtener categoría:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarCategoria();
  }, [id]);

  if (cargando) return <p>Cargando categoría...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCategoria({
        id: parseInt(id),
        categoria: nombre,
        descripcion,
        imagenCat: imagen,
      });

      alert("Categoría actualizada con éxito");
      navigate(`/admin/${usuarioId}/categorias`);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      alert(error.message || "No se pudo actualizar la categoría");
    }
  };

  return (
    <div id="editar-categoria">
      <h2>Editar Categoría</h2>
      <form onSubmit={handleSubmit}>
        <h3>Nombre</h3>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <h3>Descripción</h3>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <h3>URL de imagen</h3>
        <input
          type="text"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          placeholder="https://mi-imagen.com/categoria.png"
        />

        {imagen && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontSize: "12px", color: "#555" }}>Vista previa:</p>
            <img
              src={imagen}
              alt="Vista previa"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </div>
        )}

        <button type="submit" id="btn-guardar">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
