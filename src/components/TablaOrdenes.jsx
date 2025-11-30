//HECHO POR ANDRES BEJAR 20230352

import React from "react";
import ordenes from "../data/ordenes_B"

function TablaOrdenes() {
    return (
        <table className="TablaOrdenes">
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Fecha</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {ordenes.map((v) => {
                    return (
                        <tr>
                            <td className="ID">#{v.id}</td>
                            <td>{v.fecha}</td>
                            <td>{v.total}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TablaOrdenes;