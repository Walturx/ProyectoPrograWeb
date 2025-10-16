import HeaderHome from "../components/HeaderHome";
import Navbar from '../components/navBarHome'
import Resumen from '../components/Resumen'
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../data/logicaCarrito';
import React, { useContext } from 'react';
import QR from "../assets/qr.png";
import Footer from "../components/footer"

function PagoQR() {
  const { productos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  return (
    <>
      <HeaderHome />
      <Navbar />

      <div className="titulo-pagina">
        <h2>Checkout</h2>
      </div>
      <main className="checkout-metodo-pago">
        <section className="seccion metodo-pago">
          <h3>Escanear QR</h3>
          <img
            className="qr-imagen"
            src= {QR}
            alt="Código QR"
          />
          <p className="qr-texto">
            Válido por <b id="timer">03:00</b> minutos
          </p>
          <a href="/pedido">
            <button className="btn btn-pago">Ya realicé el pago</button>
          </a>
        </section>

        <Resumen
          productosSeleccionados={contador}
          total={total}
          descuento={descuento}
        />
      </main>
                                <Footer/>

    </>
  );
}
export default PagoQR;