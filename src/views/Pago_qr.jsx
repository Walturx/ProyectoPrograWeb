// Codigo hecho por Samantha Rodriguez

import React, { useContext } from 'react';
import HeaderHome from "../components/HeaderHome";
import Navbar from '../components/navBarHome';
import Resumen from '../components/Resumen';
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../data/logicaCarrito';
import { EnvioContext } from "../context/EnvioContext";
import { useNavigate } from "react-router-dom";
import QR from "../assets/qr.png";
import Footer from "../components/footer";
import { useUser } from '../context/UserContext';


function PagoQR() {

  const { productos, setProductos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  const { datosEnvio } = useContext(EnvioContext);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleFinalizarCompra = async () => {

    const payload = {
      idusuario: user?.id,
      subtotal: total - descuento,
      total,
      metododeentrega: "Delivery",
      metodopago: "QR",
      direccionenvio: `${datosEnvio.direccion}, ${datosEnvio.ciudad} - ${datosEnvio.departamento}`,
      nrotarjeta: null,
      tipotarjeta: null
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

      localStorage.removeItem("mi_carrito_productos");
      setProductos([]);

      navigate("/pedido");

    } catch (error) {
      console.error("Error procesando pago QR:", error);
      alert("El servidor está caído.");
    }
  };

  return (
    <>
      <HeaderHome />
      <Navbar />

      <main className="checkout-metodo-pago">
        <section className="seccion metodo-pago">
          <h3>Escanear QR</h3>
          <img className="qr-imagen" src={QR} alt="Código QR" />
          <p className="qr-texto">Válido por <b id="timer">03:00</b> minutos</p>

          <button className="btn btn-pago" onClick={handleFinalizarCompra}>
            Ya realicé el pago
          </button>

        </section>

        <Resumen productosSeleccionados={contador} total={total} descuento={descuento} />
      </main>

      <Footer />
    </>
  );
}

export default PagoQR;
