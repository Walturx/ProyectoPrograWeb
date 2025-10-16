//HECHO POR ANDRES BEJAR 20230352

import React, { useState } from "react";
import usuario from "../data/usuarios_B"

function DetalleUsuario({id}){

    const u = usuario[id];

    function Estado(v){
        if (v == true)
            return ("Activo")
        else
            return ("Inactivo")
    }

    return(
        <div>
           <div class="Detalle">
                <div>
                    <h2>{u.nombre}</h2>
                    <p>Correo: {u.correo}</p>
                    <p>Fecha de registro: {u.fecha}</p>
                    <p>Estado: {Estado(u.estado)}</p>
                </div>
                <div>
                    <img src={u.imagen} alt="Foto de perfil" />
                </div>
            </div> 
        </div>
        
    )
}

export default DetalleUsuario;
