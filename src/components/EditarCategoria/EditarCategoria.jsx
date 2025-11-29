//hecho por Jean Carlo Rado-(202235056)

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categorias } from "../../data/categoria";
import "./EditarCategoria.css";

export default function EditarCategoria() {
  const { usuarioId, id } = useParams();
  const navigate = useNavigate();

  // buscar la categoría por id
  const categoria = categorias.find(
    (cat) => cat.id === parseInt(id)
  );

  if (!categoria) return <p>Categoría no encontrada</p>;

  // estado para cada campo
  const [nombre, setNombre] = useState(categoria.categoria);
  const [descripcion, setDescripcion] = useState(
    categoria.descripcion || ""
  );
  const [imagen, setImagen] = useState(categoria.imagenCat || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // actualizar los datos de la categoría (mock)
    categoria.categoria = nombre;
    categoria.descripcion = descripcion;
    categoria.imagenCat = imagen;

    alert("Categoría actualizada con éxito");

    // navegar de regreso al listado
    navigate(`/admin/${usuarioId}/categorias`);
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
            <p style={{ fontSize: "12px", color: "#555" }}>
              Vista previa:
            </p>
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
