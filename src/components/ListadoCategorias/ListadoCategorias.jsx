// hecho por Jean Carlo Rado-(202235056)

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categorias } from "../../data/categoria";
import { usuarios } from "../../data/usuarios";
import "./ListadoCategorias.css";

export default function ListadoCategorias() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const usuario = usuarios.find((u) => u.id === parseInt(usuarioId));

  const [busqueda, setBusqueda] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState(categorias);

  if (!usuario || usuario.admin !== 1) {
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

  // 🔎 Buscar coincidencia EXACTA
  const handleBuscar = () => {
    const filtrado = categorias.filter(
      (cat) =>
        cat.categoria.toLowerCase() === busqueda.toLowerCase()
    );
    setListaFiltrada(filtrado);
  };

  // 🔄 Restaurar lista completa
  const handleVerTodas = () => {
    setListaFiltrada(categorias);
    setBusqueda("");
  };

  // 🗑 Eliminar categoría
  const handleEliminar = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?"))
      return;

    const idx = categorias.findIndex((cat) => cat.id === id);
    if (idx !== -1) categorias.splice(idx, 1);

    setListaFiltrada((prev) => prev.filter((cat) => cat.id !== id));
  };

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
              marginLeft: "10px",
            }}
            onClick={handleVerTodas}
          >
            Ver todas ↺
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
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {listaFiltrada.length > 0 ? (
              listaFiltrada.map((cat) => (
                <tr key={cat.id}>
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
                <td colSpan={3} style={{ textAlign: "center" }}>
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
