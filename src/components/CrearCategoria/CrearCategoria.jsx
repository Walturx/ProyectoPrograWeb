// hecho por Jean Carlo Rado-(202235056)

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
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Guardar categoría
  const handleGuardar = (e) => {
    e.preventDefault();

    const nombreLimpio = categoria.trim();

    if (!nombreLimpio) {
      alert("El nombre de la categoría es obligatorio.");
      return;
    }

    // Validación simple de duplicados por nombre
    const yaExiste = categorias.some(
      (cat) => cat.categoria.toLowerCase() === nombreLimpio.toLowerCase()
    );
    if (yaExiste) {
      alert("Ya existe una categoría con ese nombre.");
      return;
    }

    // Calcular nuevo id (por si el array está vacío)
    const nuevoId =
      categorias.length > 0
        ? categorias[categorias.length - 1].id + 1
        : 1;

    // Agregar nueva categoría al array mock
    categorias.push({
      id: nuevoId,
      categoria: nombreLimpio,
      descripcion,
      imagenCat: "",
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
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
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

        <div className="acciones-form">
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate(`/admin/${usuarioId}/categorias`)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
