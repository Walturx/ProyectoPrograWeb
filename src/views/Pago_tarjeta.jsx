import HeaderHome from "../components/HeaderHome";
import Navbar from '../components/navBarHome';
import Resumen from '../components/Resumen';
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../data/logicaCarrito';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Tarjeta from "../assets/tarjeta.webp";
import Footer from "../components/footer";

function PagoTarjeta() {
  const { productos, vaciarCarrito } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  const navigate = useNavigate();

  const handleFinalizarCompra = (e) => {
    e.preventDefault(); 
    localStorage.setItem("pedido_final", JSON.stringify(productos));
    vaciarCarrito();
    navigate("/pedido");
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
          <h3>Pagar con Tarjeta</h3>
          <img
            src={Tarjeta}
            alt="Tarjetas"
            className="tarjeta-img"
          />

          <form className="tarjeta-form" onSubmit={handleFinalizarCompra}>
            <label>Número de tarjeta</label>
            <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" required />

            <label>Nombre del titular</label>
            <input type="text" placeholder="Nombre" required />

            <aside className="fecha-cvv">
              <div>
                <label>Fecha de vencimiento</label>
                <input type="text" placeholder="MM/AA" required />
              </div>

              <div>
                <label>CVV</label>
                <input type="text" placeholder="123" required />
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

