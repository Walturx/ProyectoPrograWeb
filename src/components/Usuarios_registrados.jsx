//HECHO POR ANDRES BEJAR 20230352

import React, { useContext, useState } from 'react';
import usuarios from '../data/usuarios_B';
import { useNavigate } from 'react-router-dom';

function TablaUsuarios({ onUsuario }) {
    const navigate = useNavigate();
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
            <div className="tablas_cab">
                <h3>Usuarios registrados</h3>
                <button className="btn-solid" onClick={irATodos_Usuarios}>Ver todos los usuarios</button>
            </div>
            <table className="TbUsuarios">
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
                            <td className={v.estado ? "text-green" : "text-red"}>
                                {v.estado ? "Activo" : "Inactivo"}
                            </td>
                            <td className="acciones-btns">
                                <button
                                    onClick={() => CambiarEstado(v.id)}
                                    className="btn-solid"
                                    style={{ backgroundColor: v.estado ? "#22c55e" : "#22c55e" }}
                                >
                                    {v.estado ? "Desactivar" : "Activar"}
                                </button>
                                <button className="btn-outline" onClick={() => onUsuario(v.id - 1)}>Ver detalle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}

export default TablaUsuarios;