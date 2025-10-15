import React, { createContext, useState, useEffect, useRef } from "react";
import battlefield6 from "../assets/battlefield-ps5.jpg";
import pokemonPlush from "../assets//vaporeon.jpg";
import pulse3d from "../assets/auriculares.jpg";
import pokemonCards from "../assets/pokemon-cards.avif";


export const CarritoContext = createContext();

const listaBase = [
  {
    id: 1,
    nombre: "Battlefield 6 Phantom Edition - PlayStation 5",
    categoria: "Videojuego",
    precio: 199,
    cantidad: 2,
    seleccionado: true,
    imagen: battlefield6,
  },
  {
    id: 2,
    nombre: "Pokemon Vaporeon Plush",
    categoria: "Coleccionable",
    precio: 150,
    cantidad: 1,
    seleccionado: true,
    imagen: pokemonPlush,
  },
  {
    id: 3,
    nombre: "Pokemon Trading Card Game: Scarlet and Violet Night Wanderer",
    categoria: "Coleccionable",
    precio: 300,
    cantidad: 2,
    seleccionado: true,
    imagen: pokemonCards,
  },
  {
    id: 4,
    nombre: "Sony PULSE 3D Wireless Headset",
    categoria: "Periférico",
    precio: 200,
    cantidad: 2,
    seleccionado: true,
    imagen: pulse3d,
  },
];

export const CarritoProvider = ({ children }) => {
  const inicial = () => {
    const raw = localStorage.getItem("mi_carrito_productos");
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    // Si no hay nada en localStorage, devolvemos la lista base
    return [...listaBase];
  };

  const [productos, setProductos] = useState(inicial);

  useEffect(() => {
    localStorage.setItem("mi_carrito_productos", JSON.stringify(productos));
  }, [productos]);

  const vaciarCarrito = () => {
    setProductos([]); 
  };

  const restaurarProductos = () => {
    const listaOriginal = [...listaBase];
    setProductos(listaOriginal);
    localStorage.setItem("mi_carrito_productos", JSON.stringify(listaOriginal));
  };

  const agregarProducto = (producto) => {
    setProductos((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1, seleccionado: true }];
      }
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        productos,
        setProductos,
        agregarProducto,
        vaciarCarrito,
        restaurarProductos,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
