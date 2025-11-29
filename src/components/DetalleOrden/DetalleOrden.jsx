// hecho por Jean Carlo Rado-(202235056)

import { useParams } from "react-router-dom";
import { ordenes } from "../../data/ordenes";
import { productos } from "../../data/productos";

import "./DetalleOrden.css";

export default function DetalleOrden() {
  const { ordenId } = useParams();

  // Buscar la orden por ID
  const orden = ordenes.find((o) => o.id === parseInt(ordenId));
  if (!orden) return <p>Orden no encontrada</p>;

  // Calcular monto total de la orden
  const monto = orden.productos.reduce((sum, item) => {
    const prod = productos.find((p) => p.id === item.idProducto);
    if (!prod) return sum; // si no se encuentra el producto, lo ignora
    return sum + prod.precio * item.cantidad;
  }, 0);

  // Productos con datos completos y total por producto
  const productosConTotal = orden.productos
    .map((item) => {
      const prod = productos.find((p) => p.id === item.idProducto);
      if (!prod) return null;
      return {
        ...item,
        nombre: prod.nombre,
        categoria: prod.categoria,
        imagen: prod.imagen,
        total: prod.precio * item.cantidad,
      };
    })
    .filter(Boolean); // elimina nulls por si algún producto no existe o no lo llega a encontrar

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
                    className={`estado ${orden.estado.toLowerCase()}`}
                  >
                    {orden.estado}
                  </span>
                </p>
                <p>
                  <strong>Monto total:</strong>{" "}
                  <span className="monto">
                    S/ {monto.toFixed(2)}
                  </span>
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
                  {productosConTotal.map((p, idx) => (
                    <tr key={idx}>
                      <td className="producto-id">
                        <div className="img-codigo">
                          <img
                            className="img-producto"
                            src={p.imagen}
                            alt={p.nombre}
                          />
                          <div className="codigo">
                            #{p.idProducto}
                          </div>
                        </div>
                      </td>
                      <td>{p.nombre}</td>
                      <td>{p.categoria}</td>
                      <td>{p.cantidad}</td>
                      <td>S/ {p.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
