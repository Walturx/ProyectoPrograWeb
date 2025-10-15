import { useMemo } from "react";

export const useCalculoCarrito = (productos) => {
  const { total, contador, descuento } = useMemo(() => {
    let total = 0;
    let contador = 0;

    productos.forEach((p) => {
      if (p.seleccionado) {
        total += p.precio * p.cantidad;
        contador += p.cantidad;
      }
    });

    let descuento = 0;
    if (total >= 50 && total < 100) descuento = total * 0.05;
    else if (total >= 100 && total < 200) descuento = total * 0.1;
    else if (total >= 200) descuento = total * 0.15;

    return { total, contador, descuento };
  }, [productos]);

  return { total, contador, descuento };
};
