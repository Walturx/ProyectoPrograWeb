//HECHO POR ANDRES BEJAR 20230352

import React from "react";
import ordenes from "../data/ordenes_B";

function ListaOrden(){
    return(
        <>
            <table className="TablaOrden">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Usuario</th>
                        <th>Fecha de orden</th>
                        <th>Total</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map((v) =>{
                        return(
                            <tr>
                            <td className="ID">#{v.id}</td>
                            <td>{v.usuario}</td>
                            <td>{v.fecha}</td>
                            <td>{v.total}</td>
                            <td style={{color: v.estado ? "green" : "red"}}>{v.estado ? "Entregado": "No entregado"}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
    
}

export default ListaOrden;