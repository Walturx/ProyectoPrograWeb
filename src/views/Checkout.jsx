// Codigo hecho por Samantha Rodriguez

import React, { useContext, useState } from "react";
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import Resumen from "../components/Resumen";
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from "../data/logicaCarrito";
import { EnvioContext } from "../context/EnvioContext";
import { useNavigate } from "react-router-dom";
import "../assets/estilos.css";

import Footer from '../components/footer';

function Checkout() {
  const { productos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  const { setDatosEnvio } = useContext(EnvioContext);
  const { setProductosCompra } = useContext(EnvioContext);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    ciudad: "",
    departamento: "",
    direccion: "",
    telefono: "",
    codigoPostal: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDatosEnvio(form);
    setProductosCompra(productos); 
    navigate("/metodo-pago");
  };

  return (
    <>
      <HeaderHome />
      <NavBarHome />

      <div className="titulo-pagina">
        <h2>Checkout</h2>
      </div>

      <main className="checkout-contenedor">
        <div className="checkout-grid">
          <form className="form-checkout" onSubmit={handleSubmit}>
            <section className="seccion direccion-envio">
              <h3>Dirección de envío</h3>

              <div className="fila">
                <div className="campo">
                  <label>Nombre:</label>
                  <input name="nombre" value={form.nombre} onChange={handleChange} required />
                </div>

                <div className="campo">
                  <label>Apellido:</label>
                  <input name="apellido" value={form.apellido} onChange={handleChange} required />
                </div>
              </div>

              <div className="fila">
                <div className="campo">
                  <label>Ciudad:</label>
                  <input name="ciudad" value={form.ciudad} onChange={handleChange} />
                </div>

                <div className="campo">
                  <label>Departamento:</label>
                  <input name="departamento" value={form.departamento} onChange={handleChange} />
                </div>
              </div>

              <div className="campo ancho-completo">
                <label>Dirección:</label>
                <input name="direccion" value={form.direccion} onChange={handleChange} required />
              </div>

              <div className="fila">
                <div className="campo">
                  <label>Teléfono:</label>
                  <input name="telefono" value={form.telefono} onChange={handleChange} />
                </div>

                <div className="campo">
                  <label>Código Postal:</label>
                  <input name="codigoPostal" value={form.codigoPostal} onChange={handleChange} />
                </div>
              </div>

              <button type="submit" className="btn btn-pago">
                Continuar con el pago
              </button>
            </section>
          </form>

          <Resumen productosSeleccionados={contador} total={total} descuento={descuento} />

        </div>
      </main>
                        <Footer/>

    </>
  );
}
export default Checkout;

