//HECHO POR ANDRES BEJAR 20230352

import React, { useState } from "react";
import usuario from "../data/usuarios_B"

function DetalleUsuario({ id }) {

    const u = usuario[id];

    function Estado(v) {
        if (v == true)
            return ("Activo")
        else
            return ("Inactivo")
    }

    return (
        <div>
            <div className="Detalle">
                <div className="Detalle-info">
                    <h2>{u.nombre}</h2>
                    <p><strong>Correo:</strong> {u.correo}</p>
                    <p><strong>Fecha de registro:</strong> {u.fecha}</p>
                    <p><strong>Estado:</strong> {Estado(u.estado)}</p>
                </div>
                <div>
                    <img src={u.imagen} alt="Foto de perfil" />
                </div>
            </div>
        </div>

    )
}

export default DetalleUsuario;
