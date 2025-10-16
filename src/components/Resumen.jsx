import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContexto";
import './Resumen.css';

function Resumen({ productosSeleccionados, total, descuento, onGuardarParaDespues }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { vaciarCarrito } = useContext(CarritoContext);

    const rutas = ["/Checkout", "/Metodo-pago"];
    const paginasSinBotones = ["/metodo-pago", "/Checkout", "/pago-qr", "/pago-tarjeta", "/pedido"];


    const handleSiguiente = () => {
        const indexActual = rutas.indexOf(location.pathname);
        const siguienteIndex = indexActual + 1;

        if (siguienteIndex < rutas.length) {
            navigate(rutas[siguienteIndex]);
        }
    };

    const handleEliminar = () => {
        vaciarCarrito();
        navigate("/carrito");
    };

    const mostrarBotones = !paginasSinBotones.includes(location.pathname);

    return (
        <div className="resumen">
            <h2>Resumen de la compra</h2>
            <p><b>Productos seleccionados:</b> {productosSeleccionados}</p>
            <p>Delivery <span style={{ color: "green" }}>GRATIS</span></p>
            <p>Descuentos <span style={{ color: "red" }}>- S/ {descuento.toFixed(2)}</span></p>
            <p className="total">Total <span id="total">S/ {total.toFixed(2)}</span></p>

            {mostrarBotones && (
                <>
                    <button className="btn-continuar" onClick={handleSiguiente}>Continuar compra</button>
                    <button className="btn-eliminarCarrito" onClick={handleEliminar}>Cancelar compra</button>
                    <button className="btn-guardarCarrito" onClick={onGuardarParaDespues}>Guardar para después</button>
                    
                </>
            )}
        </div>
    );
}

export default Resumen;



