//hecho por Jean Carlo Rado-(202235056)

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categorias } from "../../data/categoria";
import { usuarios } from "../../data/usuarios";
import "./ListadoCategorias.css";

export default function ListadoCategorias() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const usuario = usuarios.find((u) => u.id === parseInt(usuarioId));

  // Estado para búsqueda y lista filtrada
  const [busqueda, setBusqueda] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState(categorias);

  // Validación: solo admin puede ver
  const isAdmin = usuario.admin === 1 || usuario.admin === true;

  if (!usuario || !isAdmin){
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

  // Función para filtrar categorías por nombre exacto (case-insensitive)
  const handleBuscar = () => {
    const texto = busqueda.trim().toLowerCase();
    if (texto === "") {
      // si está vacío, no filtramos nada
      setListaFiltrada(categorias);
      return;
    }

    const filtrado = categorias.filter(
      (cat) => cat.categoria.toLowerCase() === texto
    );
    setListaFiltrada(filtrado);
  };

  // Ver todas: resetear filtro y limpiar input
  const handleVerTodas = () => {
    setBusqueda("");
    setListaFiltrada(categorias);
  };

  // Función para eliminar categoría (mock: borra de array original y de la vista)
  const handleEliminar = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    // eliminar del array mock original (categorias)
    const idx = categorias.findIndex((cat) => cat.id === id);
    if (idx !== -1) {
      categorias.splice(idx, 1);
    }

    // actualizar vista (listaFiltrada)
    const nuevasCategorias = listaFiltrada.filter((cat) => cat.id !== id);
    setListaFiltrada(nuevasCategorias);
  };

  // Función para navegar al formulario de edición
  const handleEditar = (id) => {
    navigate(`/admin/${usuarioId}/categorias/editar/${id}`);
  };

  return (
    <>
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
            onClick={() =>
              navigate(`/admin/${usuarioId}/categorias/crear`)
            }
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
                      <span
                        style={{ fontSize: "12px", color: "#777" }}
                      >
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
                <td
                  colSpan={4}
                  style={{ textAlign: "center" }}
                >
                  No hay categorías que coincidan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
