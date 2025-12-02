// Codigo hecho por Samantha Rodriguez

import React, { useContext, useState } from 'react';
import HeaderHome from "../components/HeaderHome";
import Navbar from '../components/navBarHome';
import Resumen from '../components/Resumen';
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../data/logicaCarrito';
import { EnvioContext } from "../context/EnvioContext";
import { useNavigate } from "react-router-dom";
import Tarjeta from "../assets/tarjeta.webp";
import Footer from "../components/footer";
import { useUser } from '../context/UserContext';
import { crearItemDeOrden } from "../components/services/api";

function PagoTarjeta() {
  const { productos, setProductos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  const { datosEnvio } = useContext(EnvioContext);
  const navigate = useNavigate();
  const { user } = useUser();

  // ESTADOS PARA CAPTURAR DATOS DEL FORM
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();

    const payload = {
      idusuario: user?.id,
      subtotal: total - descuento,
      total,
      metododeentrega: "Delivery",
      metodopago: "TARJETA",
      direccionenvio: `${datosEnvio.direccion}, ${datosEnvio.ciudad} - ${datosEnvio.departamento}`,
      nrotarjeta: numeroTarjeta,
      tipotarjeta: "VISA",
    };

    try {
      const resp = await fetch(
        "https://proyecto-progra-web-back-end.vercel.app/orden",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await resp.json();
      if (!resp.ok || !data.success) {
        alert("Error creando la orden");
        return;
      }

      const idOrden = data.data.id;

      // Solo los productos seleccionados en el carrito
      const productosSeleccionados = productos.filter((p) => p.seleccionado);

      // Crear los items de la orden en el backend
      try {
        await Promise.all(
          productosSeleccionados.map((p) =>
            crearItemDeOrden({
              idorden: idOrden,
              idproducto: p.id,
              cantidad: p.cantidad,
              preciounitario: p.precio,
            })
          )
        );
      } catch (err) {
        console.error("Error creando items de la orden:", err);
      }

      // Guardar info para la vista de pedido
      localStorage.setItem("orden_id", idOrden);
      localStorage.setItem(
        "pedido_final",
        JSON.stringify(productosSeleccionados)
      );

      // Limpiar carrito
      localStorage.removeItem("mi_carrito_productos");
      setProductos([]);

      navigate("/pedido");
    } catch (error) {
      console.error("Error procesando pago con tarjeta:", error);
      alert("El servidor está caído.");
    }
  };

  return (
    <>
      <HeaderHome />
      <Navbar />

      <main className="checkout-metodo-pago">
        <section className="seccion metodo-pago">
          <h3>Pagar con Tarjeta</h3>
          <img src={Tarjeta} alt="Tarjetas" className="tarjeta-img" />

          <form className="tarjeta-form" onSubmit={handleFinalizarCompra}>
            <label>Número de tarjeta</label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              required
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
            />

            <label>Nombre del titular</label>
            <input
              type="text"
              placeholder="Nombre"
              required
              value={nombreTitular}
              onChange={(e) => setNombreTitular(e.target.value)}
            />

            <aside className="fecha-cvv">
              <div>
                <label>Fecha de vencimiento</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>

              <div>
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </aside>

            <button type="submit" className="btn btn-pago">
              Realizar pago
            </button>
          </form>
        </section>

        <Resumen
          productosSeleccionados={contador}
          total={total}
          descuento={descuento}
        />
      </main>

      <Footer />
    </>
  );
}

export default PagoTarjeta;
