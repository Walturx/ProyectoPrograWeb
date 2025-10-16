import React, { useContext } from 'react';
import '../assets/estilos.css';
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import Resumen from '../components/Resumen';
import Producto from "../components/Producto";
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../data/logicaCarrito';
import Footer from '../components/footer'
function Carrito() {
  const { productos, setProductos, restaurarProductos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
    console.log("Productos en carrito:", productos);


  const handleCantidadChange = (id, cantidad) => {
    setProductos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, cantidad: parseInt(cantidad) || 1 } : p
      )
    );
  };

  const handleSeleccionChange = (id) => {
    setProductos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, seleccionado: !p.seleccionado } : p
      )
    );
  };

  return (
    <>
      <HeaderHome />
      <NavBarHome />

      <div className="titulo-pagina">
        <h2>Carro</h2>
      </div>

      <main className="carrito">
        <div className="carro-productos">
          {productos.length === 0 ? (
            <div className="carrito-vacio">
              🛒 Tu carrito está vacío
            </div>
          ) : (
            productos.map((producto) => (
              <Producto
                key={producto.id}
                {...producto}
                onCantidadChange={handleCantidadChange}
                onSeleccionChange={handleSeleccionChange}
              />
            ))
          )}

        </div>

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

export default Carrito;

