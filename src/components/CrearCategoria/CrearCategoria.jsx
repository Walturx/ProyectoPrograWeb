//hecho por Jean Carlo Rado-(202235056)

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categorias } from "../../data/categoria";
import { usuarios } from "../../data/usuarios";
import "./CrearCategoria.css";

export default function CrearCategoria() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const usuario = usuarios.find((u) => u.id === parseInt(usuarioId));

  // Validación: solo admin puede crear
  if (!usuario || usuario.admin !== 1) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Acceso denegado. Solo administradores.
      </p>
    );
  }

  // Estados para el formulario
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  // Guardar categoría
  const handleGuardar = (e) => {
    e.preventDefault();

    if (!categoriaNombre.trim()) {
      alert("El nombre de la categoría es obligatorio");
      return;
    }

    // Nuevo id incremental (mock)
    const nuevoId =
      categorias.length > 0
        ? categorias[categorias.length - 1].id + 1
        : 1;

    categorias.push({
      categoria: categoriaNombre,
      descripcion,
      imagenCat: imagen || "",
      id: nuevoId,
    });

    alert("Categoría creada exitosamente 👍");

    // Redirigir al listado
    navigate(`/admin/${usuarioId}/categorias`);
  };

  return (
    <div id="crear-categoria">
      <h2>Crear Categoría</h2>
      <form onSubmit={handleGuardar}>
        <div className="form-group">
          <label>Nombre de la categoría</label>
          <input
            type="text"
            value={categoriaNombre}
            onChange={(e) => setCategoriaNombre(e.target.value)}
            placeholder="Ej: Consolas"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Escribe una breve descripción..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>URL de imagen</label>
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="https://mi-imagen.com/categoria.png"
          />
        </div>

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

        <div className="acciones-form">
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={() =>
              navigate(`/admin/${usuarioId}/categorias`)
            }
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
