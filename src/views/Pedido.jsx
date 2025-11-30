// Codigo hecho por Samantha Rodriguez

import HeaderHome from "../components/HeaderHome";
import Navbar from "../components/navBarHome";
import Resumen from "../components/Resumen";
import Producto from "../components/Producto";
import { useCalculoCarrito } from "../data/logicaCarrito";
import { EnvioContext } from "../context/EnvioContext";
import { useContext, useEffect, useState } from 'react';
import { obtenerFechaEntrega } from "../data/fechaEnvio";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

function Pedido() {
  const navigate = useNavigate();
  const { datosEnvio } = useContext(EnvioContext);
  const [productosFinal, setProductosFinal] = useState([]); // estado para los productos del pedido
  const fechaFormateada = obtenerFechaEntrega(2);

  useEffect(() => {
    const idOrden = localStorage.getItem("orden_id");
    if (!idOrden) {
      navigate("/home");
      return;
    }

    const pedidoGuardado = JSON.parse(localStorage.getItem("pedido_final")) || [];
    setProductosFinal(pedidoGuardado);
  }, []);


  const { total, contador, descuento } = useCalculoCarrito(productosFinal);

  return (
    <>
      <HeaderHome />
      <Navbar />

      <main className="pedido-completado">
        <div className="mensaje-exito">
          <h2>Orden completada ✅</h2>
          <p>¡Gracias por tu compra!</p>
        </div>

        <div className="checkout-grid">
          <div className="carro-productos">
            {productosFinal.length === 0 ? (
              <p>No hay productos en este pedido.</p>
            ) : (
              productosFinal.map((producto) => (
                <Producto key={producto.id} {...producto} />
              ))
            )}
          </div>

          <aside className="resumen-final">
            <Resumen
              productosSeleccionados={contador}
              total={total}
              descuento={descuento}
            />

            <div className="direccion-envio-final">
              <h3>Dirección de envío</h3>
              {datosEnvio?.nombre ? (
                <>
                  <p>
                    {datosEnvio.nombre} {datosEnvio.apellido}
                    <br />
                    {datosEnvio.direccion}
                    <br />
                    {datosEnvio.ciudad} - {datosEnvio.departamento}
                  </p>
                  <p>
                    Celular: <b>{datosEnvio.telefono}</b>
                  </p>
                  <p>
                    Código Postal: <b>{datosEnvio.codigoPostal}</b>
                  </p>
                  <p>
                    Fecha de entrega aproximada: <b>{fechaFormateada}</b>
                  </p>
                </>
              ) : (
                <p style={{ color: "red" }}>❌ No hay datos de envío guardados.</p>
              )}
              <img
                src="https://media.istockphoto.com/id/1200224470/es/vector/logotipo-de-moto-delivery-man-plantilla-vectorial-de-icono-y-s%C3%ADmbolo.jpg?s=612x612&w=0&k=20&c=zCxW556jgK7lMD6evnQIiYLOldB8iW32S_zlOTI4mOs="
                alt="Delivery"
                className="icono-delivery"
              />
            </div>

            <button className="btn btn-pago">Ver más ofertas</button>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Pedido;





