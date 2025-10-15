import HeaderMain from '../components/Header';
import Navbar from '../components/NavBarHome';
import Resumen from '../components/Resumen';
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../logic/logicaCarrito';
import React, { useContext } from 'react';
import { useMetodoPagoHandler } from '../logic/redireccionPago';
import PagoQR from "../assets/pago-qr.png";
import PagoTarjeta from "../assets/pago-tarjeta.png";


function MetodoPago() {
  const { productos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  const { handleChange } = useMetodoPagoHandler();

  return (
    <>
      <HeaderMain />
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
              <span>Pago con Tarjeta</span>
            </div>
            <img
              src={PagoTarjeta}
              alt="Tarjetas"
            />
          </label>

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

export default MetodoPago;