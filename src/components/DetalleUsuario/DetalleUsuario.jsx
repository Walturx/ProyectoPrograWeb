import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usuarios } from "../../data/usuarios";
import { ordenes } from "../../data/ordenes";
import { productos } from "../../data/productos";
import HeaderHome from "../HeaderHome";
import NavBarHome from "../navBarHome";

import "./DetalleUsuario.css";

export default function DetalleUsuario() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();
  const [busquedaId, setBusquedaId] = useState(""); // estado para el input de busqueda..al principio no hay nada pero al escribir e darle click a su boton se actualiza

  // Buscar usuario
  const usuario = usuarios.find(u => u.id === parseInt(usuarioId));
  if (!usuario) return <p>Usuario no encontrado</p>;

  // Filtrar órdenes del usuario y calcular monto
  const ordenesUsuario = ordenes
    .filter(o => o.idUsuario === usuario.id)
    .map(orden => {
      const monto = orden.productos.reduce((sum, item) => {
        const prod = productos.find(p => p.id === item.idProducto);
        return sum + prod.precio * item.cantidad;
      }, 0);
      return { ...orden, monto }; // Copia orden y agrega monto total
    });

  // Estado inicial: mostrar todas las órdenes--al filtrar con el boton solo dara la orden q encuentra con el filter
  const [ordenesFiltradas, setOrdenesFiltradas] = useState(ordenesUsuario);

  // Función que se ejecuta al presionar el botón buscar
  const handleBuscar = () => {
    const id = parseInt(busquedaId);
    const encontrada = ordenesUsuario.find(o => o.id === id);
    if (encontrada) {
      setOrdenesFiltradas([encontrada]); // mostrar solo esa orden
    } else {
      alert("Error. Orden no encontrada");
      setOrdenesFiltradas([]); // limpiar la tabla si no se encuentra
    }
  };

  return (
    <>
      <HeaderHome />
      <NavBarHome />

      <div id="detalle-usuario">
        {/* Título y botón Cambiar Contraseña */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Detalles de Usuario</h2>
          <button
            className="btn-ver"
            onClick={() => navigate(`/usuario/${usuario.id}/cambiar-clave`)} // Ruta para cambiar clave
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Datos de usuario e imagen */}
        <div id="info-usuario">
          <div id="datos-usuario">
            <p><b>Nombre:</b> {usuario.nombre}</p>
            <p><b>Email:</b> {usuario.email}</p>
            <p><b>Fecha de registro:</b> {usuario.fechaRegistro}</p>
            <p><b>Telefono:</b> {usuario.telefono}</p>
            <p><b>Estado:</b> {usuario.estado}</p>
          </div>

          <div id="imagen-usuario">
            <img src={usuario.imagen} alt={usuario.nombre} />
          </div>
        </div>

        {/* Buscador de orden por ID */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="number"
            placeholder="Buscar orden por ID..." // placeholder 
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button className="btn-ver" onClick={handleBuscar}>
            Buscar
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
                ordenesFiltradas.map(orden => (
                  <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>{orden.fecha}</td>
                    <td>S/ {orden.monto.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn-ver"
                        onClick={() => navigate(`/usuario/${usuario.id}/orden/${orden.id}`)} // Ruta a detalles de orden
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={4}>{/* colspan hace q la tabla ocupe las 4 columnas */}
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
