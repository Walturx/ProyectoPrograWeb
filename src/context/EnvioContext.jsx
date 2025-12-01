// Codigo hecho por Samantha Rodriguez

import { createContext, useState, useEffect } from "react";

export const EnvioContext = createContext();

export const EnvioProvider = ({ children }) => {
    const [datosEnvio, setDatosEnvio] = useState(null);
    const [productosCompra, setProductosCompra] = useState([]);

    return (
        <EnvioContext.Provider value={{ datosEnvio, setDatosEnvio, productosCompra, setProductosCompra }}>
            {children}
        </EnvioContext.Provider>
    );
};


