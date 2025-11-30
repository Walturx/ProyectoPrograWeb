//hecho por Jean Carlo Rado-(202235056) [adaptado a backend]

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategorias,
  deleteCategoria,
  getUsuarioById,
} from "../services/api";
import "./ListadoCategorias.css";

export default function ListadoCategorias() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);

  // Cargar usuario y categorías
  useEffect(() => {
    const cargarTodo = async () => {
      try {
        setCargandoUsuario(true);
        setCargandoCategorias(true);

        const [user, cats] = await Promise.all([
          getUsuarioById(usuarioId),
          getCategorias(),
        ]);

        setUsuario(user);
        setCategorias(cats);
        setListaFiltrada(cats);
      } catch (error) {
        console.error("Error cargando usuario o categorías:", error);
      } finally {
        setCargandoUsuario(false);
        setCargandoCategorias(false);
      }
    };

    cargarTodo();
  }, [usuarioId]);

  if (cargandoUsuario || cargandoCategorias) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando...</p>;
  }

  if (!usuario) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Usuario no encontrado.</p>;
  }

  const isAdmin = usuario.admin === 1 || usuario.admin === true;

  if (!isAdmin) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Acceso denegado. Solo administradores.</p>
        <img
          src="https://media.tenor.com/hYVsWvkpdrMAAAAM/you-didnt-say-the-magic-word-ah-ah.gif"
          alt="Acceso Denegado"
          style={{
            width: "760px",
            margin: "40px auto",
            borderRadius: "8px",
          }}
        />
      </div>
    );
  }

  // Buscar categoría por nombre exacto (case-insensitive)
  const handleBuscar = () => {
    const texto = busqueda.trim().toLowerCase();
    if (texto === "") {
      setListaFiltrada(categorias);
      return;
    }

    const filtrado = categorias.filter(
      (cat) => cat.categoria.toLowerCase() === texto
    );
    setListaFiltrada(filtrado);
  };

  const handleVerTodas = () => {
    setBusqueda("");
    setListaFiltrada(categorias);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    try {
      await deleteCategoria(id);
      const nuevasCategorias = categorias.filter((cat) => cat.id !== id);
      setCategorias(nuevasCategorias);
      setListaFiltrada((prev) => prev.filter((cat) => cat.id !== id));
      alert("Categoría eliminada correctamente.");
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      alert(error.message || "No se pudo eliminar la categoría.");
    }
  };

  const handleEditar = (id) => {
    navigate(`/admin/${usuarioId}/categorias/editar/${id}`);
  };

  return (
    <div id="listado-categorias">
      <h2>Listado de Categorías</h2>

      <div id="acciones-listado">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button
          style={{
            background: "#28a745",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            marginRight: "8px",
          }}
          onClick={handleBuscar}
        >
          Buscar 🔍
        </button>

        <button
          style={{
            background: "#28a745",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            marginRight: "8px",
          }}
          onClick={handleVerTodas}
        >
          Ver todas
        </button>

        <button
          id="btn-agregar"
          onClick={() => navigate(`/admin/${usuarioId}/categorias/crear`)}
        >
          (+) Agregar categoría
        </button>
      </div>

      <table id="tabla-categorias">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaFiltrada.length > 0 ? (
            listaFiltrada.map((cat) => (
              <tr key={cat.id}>
                <td>
                  {cat.imagenCat ? (
                    <img
                      src={cat.imagenCat}
                      alt={cat.categoria}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "12px", color: "#777" }}>
                      Sin imagen
                    </span>
                  )}
                </td>
                <td>{cat.categoria}</td>
                <td>{cat.descripcion || "Sin descripción"}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(cat.id)}
                  >
                    Editar ✏️
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(cat.id)}
                  >
                    Eliminar 🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No hay categorías que coincidan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
