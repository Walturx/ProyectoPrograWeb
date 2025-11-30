//hecho por Jean Carlo Rado-(202235056) [adaptado a backend]

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCategoria, getUsuarioById } from "../services/api";
import "./CrearCategoria.css";

export default function CrearCategoria() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const user = await getUsuarioById(usuarioId);
        setUsuario(user);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      } finally {
        setCargandoUsuario(false);
      }
    };
    cargarUsuario();
  }, [usuarioId]);

  if (cargandoUsuario) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando...</p>;
  }

  if (!usuario) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Usuario no encontrado.</p>;
  }

  const isAdmin = usuario.admin === 1 || usuario.admin === true;

  if (!isAdmin) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Acceso denegado. Solo administradores.
      </p>
    );
  }

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!categoriaNombre.trim()) {
      alert("El nombre de la categoría es obligatorio");
      return;
    }

    try {
      await createCategoria({
        categoria: categoriaNombre,
        descripcion,
        imagenCat: imagen || "",
      });

      alert("Categoría creada exitosamente 👍");
      navigate(`/admin/${usuarioId}/categorias`);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert(error.message || "No se pudo crear la categoría");
    }
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
