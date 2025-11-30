// Codigo hecho por Samantha Rodriguez 

import HeaderHome from "../components/HeaderHome";
import Navbar from '../components/navBarHome';
import Resumen from '../components/Resumen';

import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../data/logicaCarrito';
import { EnvioContext } from "../context/EnvioContext";
import { useUser } from "../context/UserContext";

import React, { useContext, useState } from 'react';
import { useMetodoPagoHandler } from '../data/redireccionPago';

import PagoQR from "../assets/pago-qr.png";
import PagoTarjeta from "../assets/pago-tarjeta.png";
import Footer from "../components/footer";

import { useNavigate } from "react-router-dom";

function MetodoPago() {
  const navigate = useNavigate();

  // Datos del carrito
  const { productos, vaciarCarrito } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);

  // Datos del usuario logueado
  const { user } = useUser();

  // Datos del envio (guardados en Checkout)
  const { datosEnvio } = useContext(EnvioContext);

  // Método elegido
  const { handleChange } = useMetodoPagoHandler();
  const [metodo, setMetodo] = useState("");

  const onSelectMetodo = (e) => {
    setMetodo(e.target.id);
    handleChange(e);
  };

  const procesarPago = async () => {
    if (!metodo) {
      alert("Selecciona un método de pago.");
      return;
    }

    if (!datosEnvio) {
      alert("No hay datos de envío. Regresa al checkout.");
      navigate("/checkout");
      return;
    }

    const pagoSeleccionado = metodo === "qr-radio" ? "QR" : "TARJETA";

    const payload = {
      idusuario: user?.id ?? 1,
      subtotal: total - descuento,
      total: total,
      metododeentrega: "Delivery",
      metodopago: pagoSeleccionado,                          
      direccionenvio: `${datosEnvio.direccion}, ${datosEnvio.ciudad} - ${datosEnvio.departamento}`,
      nrotarjeta: pagoSeleccionado === "TARJETA" ? datosEnvio?.nrotarjeta ?? null : null,
      tipotarjeta: pagoSeleccionado === "TARJETA" ? "Visa" : null
    };

    try {
      const resp = await fetch("http://localhost:3005/orden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok || !data.success) {
        alert("Error creando la orden.");
        return;
      }

      localStorage.setItem("orden_id", data.data.id);

      localStorage.setItem("pedido_final", JSON.stringify(productos));

      await vaciarCarrito();

      navigate("/pedido");

    } catch (error) {
      alert("El servidor está caído, no se pudo crear la orden.");
      console.error("Error al procesar el pago:", error);
    }
  };



  return (
    <>
      <HeaderHome />
      <Navbar />

      <div className="titulo-pagina">
        <h2>Checkout</h2>
      </div>

      <main className="checkout-metodo-pago">
        <section className="seccion metodo-pago">
          <h3>Método de pago</h3>

          <label className="opcion-pago">
            <div className="texto-radio">
              <input
                type="radio"
                name="pago"
                id="qr-radio"
                onChange={onSelectMetodo}
              />
              <span>Pago con Código QR</span>
            </div>
            <img src={PagoQR} alt="Pago con QR" />
          </label>

          <label className="opcion-pago">
            <div className="texto-radio">
              <input
                type="radio"
                name="pago"
                id="tarjeta-radio"
                onChange={onSelectMetodo}
              />
              <span>Pago con Tarjeta</span>
            </div>
            <img src={PagoTarjeta} alt="Tarjetas" />
          </label>

          <button
            className="btn btn-pago"
            onClick={procesarPago}
          >
            Confirmar pago
          </button>

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

export default MetodoPago;
