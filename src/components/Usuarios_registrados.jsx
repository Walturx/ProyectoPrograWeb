//HECHO POR ANDRES BEJAR 20230352

import React, { useContext, useState } from 'react';
import usuarios from '../data/usuarios_B';

function TablaUsuarios({onUsuario}) {

    const irATodos_Usuarios = () => {
    navigate("/admin/usuarios"); 
    };  

    const [estado, setEstado] = useState(usuarios)

    const CambiarEstado = (id) => {
        setEstado((prevUsuarios) =>
            prevUsuarios.map((u) => u.id === id ? { ...u, estado: !u.estado } : u
            )
        )
    }
    

    return (
        <div>
            <div class="tablas_cab">
                <h3>Usuarios registrados</h3>
                <button onClick={irATodos_Usuarios}>Ver todos los usuarios</button>
            </div>
            <table class="TbUsuarios">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th></th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estado.map((v) => (

                                <tr key={v.id}>

                                <td>
                                    <img src={v.imagen} /></td>
                                <td>{v.nombre}</td>
                                <td style={{color: v.estado ? "green" : "red"}}>
                                    {v.estado ?"Activo" : "Inactivo"}
                                </td>
                                <td><button 
                                onClick={()=> CambiarEstado(v.id)} className={v.estado? "Desactivar": "Activar"}>
                                    {v.estado ?"Desactivar" : "Activar"}
                                </button>
                                    <button className="Desactivar" onClick={() => onUsuario(v.id-1)}>Ver detalle</button>
                                    </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}

export default TablaUsuarios;