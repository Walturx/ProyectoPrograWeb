// hecho por Jean Carlo Rado-(202235056)

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usuarios } from "../../data/usuarios";
import { ordenes } from "../../data/ordenes";
import { productos } from "../../data/productos";

import "./DetalleUsuario.css";

export default function DetalleUsuario() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();
  const [busquedaId, setBusquedaId] = useState("");

  // Buscar usuario
  const usuario = usuarios.find((u) => u.id === parseInt(usuarioId));
  if (!usuario) return <p>Usuario no encontrado</p>;

  // Filtrar órdenes del usuario y calcular monto
  const ordenesUsuario = ordenes
    .filter((o) => o.idUsuario === usuario.id)
    .map((orden) => {
      const monto = orden.productos.reduce((sum, item) => {
        const prod = productos.find(
          (p) => p.id === item.idProducto
        );
        if (!prod) return sum;
        return sum + prod.precio * item.cantidad;
      }, 0);
      return { ...orden, monto };
    });

  // Estado inicial: mostrar todas las órdenes
  const [ordenesFiltradas, setOrdenesFiltradas] =
    useState(ordenesUsuario);

  // Buscar por ID de orden
  const handleBuscar = () => {
    if (!busquedaId.trim()) {
      alert("Ingrese un ID de orden.");
      return;
    }

    const id = parseInt(busquedaId);
    if (isNaN(id)) {
      alert("Ingrese un ID válido.");
      return;
    }

    const encontrada = ordenesUsuario.find((o) => o.id === id);
    if (encontrada) {
      setOrdenesFiltradas([encontrada]);
    } else {
      alert("Error. Orden no encontrada");
      setOrdenesFiltradas([]);
    }
  };

  const handleVerTodas = () => {
    setOrdenesFiltradas(ordenesUsuario);
    setBusquedaId("");
  };

  return (
    <>
      <div id="detalle-usuario">
        {/* Título y botón Cambiar Contraseña */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "30px" }}>Detalles de Usuario</h2>
          <button
            className="btn-ver"
            onClick={() =>
              navigate(`/usuario/${usuario.id}/cambiar-clave`)
            }
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Datos de usuario e imagen */}
        <div id="info-usuario">
          <div id="datos-usuario">
            <p>
              <b>Nombre:</b> {usuario.nombre}
            </p>
            <p>
              <b>Email:</b> {usuario.email}
            </p>
            <p>
              <b>Fecha de registro:</b> {usuario.fechaRegistro}
            </p>
            <p>
              <b>Telefono:</b> {usuario.telefono}
            </p>
            <p>
              <b>Estado:</b> {usuario.estado}
            </p>
          </div>

          <div id="imagen-usuario">
            <img src={usuario.imagen} alt={usuario.nombre} />
          </div>
        </div>

        {/* Buscador de orden por ID */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="number"
            placeholder="Buscar orden por ID..."
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button className="btn-ver" onClick={handleBuscar}>
            Buscar 🔍
          </button>
          <button
            className="btn-ver"
            style={{ marginLeft: "10px" }}
            onClick={handleVerTodas}
          >
            Ver todas
          </button>
        </div>

        {/* Tabla de órdenes */}
        <div id="ultimas-ordenes" style={{ marginTop: "20px" }}>
          <h3>Últimas Órdenes</h3>
          <table id="tabla-ordenes">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.length > 0 ? (
                ordenesFiltradas.map((orden) => (
                  <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>{orden.fecha}</td>
                    <td>S/ {orden.monto.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn-ver"
                        onClick={() =>
                          navigate(
                            `/usuario/${usuario.id}/orden/${orden.id}`
                          )
                        }
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    style={{ textAlign: "center" }}
                    colSpan={4}
                  >
                    No hay órdenes para este usuario
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
