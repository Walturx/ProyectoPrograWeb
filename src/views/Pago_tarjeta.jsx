import HeaderMain from '../components/Header'
import Navbar from '../components/NavBarHome'
import Resumen from '../components/Resumen'
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../logic/logicaCarrito';
import React, { useContext } from 'react';
import Tarjeta from "../assets/tarjeta.webp";


function PagoTarjeta() {
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
          <h3>Pagar con Tarjeta</h3>
          <img
            src= {Tarjeta}
            alt="Tarjetas"
            className="tarjeta-img"
          />

          <form className="tarjeta-form">
            <label>Número de tarjeta</label>
            <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />

            <label>Nombre del titular</label>
            <input type="text" placeholder="Nombre" />

            <aside className="fecha-cvv">
              <label>Fecha de vencimiento</label>
              <input type="text" placeholder="MM/AA" />
              <label>CVV</label>
              <input type="text" placeholder="123" />
            </aside>


            <a href="/pedido">
              <button type="button" className="btn btn-pago">
                Realizar pago
              </button>
            </a>
          </form>
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
export default PagoTarjeta;