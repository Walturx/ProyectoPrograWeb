// hecho por Jean Carlo Rado-(202235056) [adaptado a backend]

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsuarioById, getOrdenes } from "../services/api";

import "./DetalleUsuario.css";

export default function DetalleUsuario() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [ordenesUsuario, setOrdenesUsuario] = useState([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [user, ordenes] = await Promise.all([
          getUsuarioById(usuarioId),
          getOrdenes(),
        ]);

        setUsuario(user);

        const ordenesUser = ordenes
          .filter((o) => o.idusuario === user.id)
          .map((o) => ({
            ...o,
            monto: Number(o.total || 0),
          }));

        setOrdenesUsuario(ordenesUser);
        setOrdenesFiltradas(ordenesUser);
      } catch (error) {
        console.error("Error al cargar usuario u órdenes:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [usuarioId]);

  if (cargando) return <p>Cargando...</p>;
  if (!usuario) return <p>Usuario no encontrado</p>;

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

  const fechaRegistro =
    usuario.fecharegistro || usuario.fechaRegistro || "—";
  const imagen =
    usuario.imagen ||
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  return (
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
          onClick={() => navigate(`/usuario/${usuario.id}/cambiar-clave`)}
        >
          Cambiar Contraseña
        </button>
      </div>

      {/* Datos de usuario e imagen */}
      <div id="info-usuario">
        <div id="datos-usuario">
          <p>
            <b>Nombre:</b> {usuario.nombre} {usuario.apellido || ""}
          </p>
          <p>
            <b>Email:</b> {usuario.email}
          </p>
          <p>
            <b>Fecha de registro:</b> {fechaRegistro}
          </p>
          <p>
            <b>Telefono:</b> {usuario.telefono || "—"}
          </p>
          <p>
            <b>Estado:</b> {usuario.estado || "—"}
          </p>
        </div>

        <div id="imagen-usuario">
          <img src={imagen} alt={usuario.nombre} />
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
                  <td>S/ {Number(orden.monto).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn-ver"
                      onClick={() =>
                        navigate(`/usuario/${usuario.id}/orden/${orden.id}`)
                      }
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={4}>
                  No hay órdenes para este usuario
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
