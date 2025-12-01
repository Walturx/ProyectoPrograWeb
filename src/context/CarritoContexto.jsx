// Codigo hecho por Samantha Rodriguez

import React, { createContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import {
  getCarritoByUsuario,
  getItemsDeCarrito,
  agregarItemCarrito,
  crearCarrito,
} from "../components/services/api";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { user } = useUser();
  const idusuario = user ? user.id : null;

  const [carritoBDId, setCarritoBDId] = useState(null);

  const inicial = () => {
    const raw = localStorage.getItem("mi_carrito_productos");
    if (!raw) return [];
    try {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const [productosEnCarrito, setProductosEnCarrito] = useState(inicial);

  // Guardar en localStorage solo si hay carrito en BD
  useEffect(() => {
    if (!carritoBDId) return;
    const filtrados = productosEnCarrito.filter((p) => p.cantidad > 0);
    localStorage.setItem("mi_carrito_productos", JSON.stringify(filtrados));
  }, [productosEnCarrito, carritoBDId]);

  useEffect(() => {
    if (!idusuario) return;

    const cargarCarritoDesdeBackend = async () => {
      try {
        // 1) Buscar carrito del usuario
        let res = await getCarritoByUsuario(idusuario);

        let carritoId;
        if (!res.data) {
          const creado = await crearCarrito(idusuario);
          carritoId = creado.data.id;
        } else {
          carritoId = res.data.id;
        }

        setCarritoBDId(carritoId);

        const itemsRes = await getItemsDeCarrito(carritoId);

        // const productosBD = (itemsRes.data || []).map((item) => ({
        //   id: item.idproducto,
        //   cantidad: item.cantidad,
        //   seleccionado: true,
        // }));

        setProductosEnCarrito(productosBD);
      } catch (error) {
        console.error("Backend caído → usando localStorage", error);
        setProductosEnCarrito(inicial());
      }
    };

    cargarCarritoDesdeBackend();
  }, [idusuario]);



  const agregarProducto = async (producto) => {
    // FRONT
    setProductosEnCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);

      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1, seleccionado: true }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1, seleccionado: true }];
      }
    });

    // BACK
    if (carritoBDId) {
      try {
        await agregarItemCarrito({
          idcarrito: carritoBDId,
          idproducto: producto.id,
          cantidad: 1,
        });
      } catch (error) {
        console.error("Error agregando item en backend:", error);
      }
    }
  };

  const actualizarCantidad = async (idProducto, cantidad) => {
    const cant = parseInt(cantidad) || 1;

    // FRONT
    setProductosEnCarrito((prev) =>
      prev.map((p) => (p.id === idProducto ? { ...p, cantidad: cant } : p))
    );

    // BACK
    if (carritoBDId) {
      try {
        await agregarItemCarrito({
          idcarrito: carritoBDId,
          idproducto: idProducto,
          cantidad: cant,
        });
      } catch (err) {
        console.error("Error actualizando cantidad en backend:", err);
      }
    }
  };

  const cambiarSeleccion = (idProducto) => {
    setProductosEnCarrito((prev) =>
      prev.map((p) =>
        p.id === idProducto ? { ...p, seleccionado: !p.seleccionado } : p
      )
    );
  };


  const vaciarCarrito = async () => {
    // FRONTEND
    setProductosEnCarrito([]);
    localStorage.removeItem("mi_carrito_productos");


    setCarritoBDId(null);

    // BACKEND
    if (carritoBDId) {
      try {
        await fetch(`https://proyecto-progra-web-back-end.vercel.app/itemcarrito/carrito/${carritoBDId}`, {
          method: "DELETE",
        });
      } catch (e) {
        console.error("Error eliminando items en backend:", e);
      }
    }
  };



  const eliminarProducto = async (idProducto) => {
    setProductosEnCarrito((prev) => prev.filter((p) => p.id !== idProducto));

    if (carritoBDId) {
      try {
        const itemsRes = await getItemsDeCarrito(carritoBDId);
        const item = (itemsRes.data || []).find(
          (i) => i.idproducto === idProducto
        );

        if (item) {
          await fetch(`https://proyecto-progra-web-back-end.vercel.app/itemcarrito/${item.id}`, {
            method: "DELETE",
          });
        }
      } catch (error) {
        console.error("Error eliminando item en backend:", error);
      }
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        productos: productosEnCarrito,
        setProductos: setProductosEnCarrito,
        agregarProducto,
        actualizarCantidad,
        cambiarSeleccion,
        vaciarCarrito,
        eliminarProducto,
        carritoBDId,
        idusuario,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
