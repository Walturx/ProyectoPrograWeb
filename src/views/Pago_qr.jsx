import HeaderMain from '../components/Header'
import Navbar from '../components/NavBarHome'
import Resumen from '../components/Resumen'
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../logic/logicaCarrito';
import React, { useContext } from 'react';
import QR from "../assets/qr.png";


function PagoQR() {
  const { productos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  return (
    <>
      <HeaderMain />
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
    </>
  );
}
export default PagoQR;