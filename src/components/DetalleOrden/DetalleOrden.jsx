// hecho por Jean Carlo Rado-(202235056) [adaptado a backend]

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrdenById } from "../services/api";
import "./DetalleOrden.css";

export default function DetalleOrden() {
  const { ordenId } = useParams();

  const [orden, setOrden] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarOrden = async () => {
      try {
        setCargando(true);
        const data = await getOrdenById(ordenId);
        setOrden(data);
      } catch (err) {
        console.error("Error al obtener detalle de orden:", err);
        setError("No se pudo cargar la orden.");
      } finally {
        setCargando(false);
      }
    };
    cargarOrden();
  }, [ordenId]);

  if (cargando) return <p>Cargando detalle de orden...</p>;
  if (error) return <p>{error}</p>;
  if (!orden) return <p>Orden no encontrada</p>;

  const items = orden.items || [];

  const monto = items.reduce(
    (sum, item) =>
      sum + Number(item.precioUnitario || 0) * (item.cantidad || 0),
    0
  );

  return (
    <>
      <h1 className="titulo-seccion">Detalle de orden</h1>
      <main id="contenedor">
        <section id="detalle-orden" className="tarjeta">
          <div className="orden-card">
            <div className="orden-header">
              <h1 id="orden-titulo">
                Orden <span className="orden-num">#{orden.id}</span>
              </h1>

              <div id="info-orden">
                <p>
                  <strong>Estado:</strong>{" "}
                  <span
                    className={`estado ${
                      (orden.estado || "").toLowerCase()
                    }`}
                  >
                    {orden.estado}
                  </span>
                </p>
                <p>
                  <strong>Monto total:</strong>{" "}
                  <span className="monto">S/ {monto.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <h3 className="productos-titulo">Productos ordenados</h3>

            <div className="tabla-wrap">
              <table id="tabla-productos">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="producto-id">
                        <div className="img-codigo">
                          {item.imagen && (
                            <img
                              className="img-producto"
                              src={item.imagen}
                              alt={item.nombre}
                            />
                          )}
                          <div className="codigo">
                            #{item.idProducto}
                          </div>
                        </div>
                      </td>
                      <td>{item.nombre}</td>
                      <td style={{ color: "black", fontSize: "16px" }}>
                        {item.categoriaNombre ?? "SIN CATEGORÍA"}
                      </td>
                      <td>{item.cantidad}</td>
                      <td>
                        S/{" "}
                        {(
                          Number(item.precioUnitario || 0) *
                          (item.cantidad || 0)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        No hay productos en esta orden.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
