// Codigo hecho por Samantha Rodriguez

import { createContext, useState, useEffect } from "react";

export const EnvioContext = createContext();

export function EnvioProvider({ children }) {
  const [datosEnvio, setDatosEnvio] = useState(() => {
    const guardado = localStorage.getItem("datosEnvio");
    return guardado
      ? JSON.parse(guardado)
      : {
          nombre: "",
          apellido: "",
          ciudad: "",
          departamento: "",
          direccion: "",
          telefono: "",
          codigoPostal: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("datosEnvio", JSON.stringify(datosEnvio));
  }, [datosEnvio]);

  return (
    <EnvioContext.Provider value={{ datosEnvio, setDatosEnvio }}>
      {children}
    </EnvioContext.Provider>
  );
}

