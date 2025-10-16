import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const inicial = () => {
    const raw = localStorage.getItem("mi_carrito_productos");
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
    return []; 
  };

  const [productosEnCarrito, setProductosEnCarrito] = useState(inicial);

  useEffect(() => {
    
    const filtrados = productosEnCarrito.filter(p => p.cantidad > 0);
    localStorage.setItem("mi_carrito_productos", JSON.stringify(filtrados));
  }, [productosEnCarrito]);

  const vaciarCarrito = () => {
    setProductosEnCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        productos: productosEnCarrito,
        setProductos: setProductosEnCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};


