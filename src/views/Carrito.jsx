import React, { useContext, useState, useEffect } from 'react';
import '../assets/estilos.css';
import HeaderHome from '../components/HeaderHome';
import NavBarHome from '../components/navBarHome';
import Resumen from '../components/Resumen';
import Producto from "../components/Producto";
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from '../data/logicaCarrito';
import Footer from '../components/footer';

function Carrito() {
  const { productos, setProductos } = useContext(CarritoContext);
  const { total, contador, descuento } = useCalculoCarrito(productos);
  const [guardados, setGuardados] = useState([]);

  // Cargar productos guardados desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("guardados");
      const data = raw ? JSON.parse(raw) : [];
      setGuardados(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error leyendo guardados:", e);
      setGuardados([]);
    }
  }, []);

  // Actualizar localStorage cuando cambien los guardados
  useEffect(() => {
    localStorage.setItem("guardados", JSON.stringify(guardados));
  }, [guardados]);

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

  // Guardar todo el carrito para después
  const handleGuardarParaDespues = () => {
    if (productos.length === 0) return;
    setGuardados(prev => [...prev, ...productos]);
    setProductos([]);
  };

  // Mover un producto guardado al carrito
  const moverAlCarrito = (id) => {
    const producto = guardados.find(p => p.id === id);
    if (!producto) return;
    setProductos(prev => [...prev, producto]);
    setGuardados(prev => prev.filter(p => p.id !== id));
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
            <div className="carrito-vacio">🛒 Tu carrito está vacío</div>
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
          onGuardarParaDespues={handleGuardarParaDespues}
        />
      </main>

      {guardados.length > 0 && (
        <section className="guardados-seccion">
          <h2>Guardado para después</h2>
          <div className="carro-productos">
            {guardados.map((producto) => (
              <div key={producto.id}>
                <Producto
                  {...producto}
                  onCantidadChange={() => {}}
                  onSeleccionChange={() => {}}
                />
                <button
                  className="btn-continuar"
                  onClick={() => moverAlCarrito(producto.id)}
                >
                  Mover al carrito
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

export default Carrito;
