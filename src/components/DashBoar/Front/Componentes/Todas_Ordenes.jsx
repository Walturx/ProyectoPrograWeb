//Codigo hecho por Jarol Yagami 20234801

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todas_Ordenes(){

const navigate = useNavigate();
const [Ordenes , setOrdenes] = useState([]);

useEffect(() =>{
    fetch("http://localhost:5000/ordenes")
    .then(res => res.json())
     .then(data => setOrdenes(data))
        .catch(err => console.error("Error de carga de usuarios...",err));
}, []);


return(
    <>
<div>
    <div className="container">
        <h1>Listado de órdenes</h1>
        <div className="buscador">
          <input type="text" placeholder="Buscar un usuario..." />
          <button>Buscar</button>
        </div>
    <div className="order-card">
        <table>
            <thead>
                <tr>
                    <th>#ORDEN</th>
                    <th>Usuario</th>
                    <th>Fecha de orden</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    Ordenes.map( o => (
                        <>
                        <tr>
                        <td>#{o.Orde_ID}</td>
                        <td>{o.Ord_Clie_ID}</td>
                        <td>{o.Ord_Fecha_Ord}</td>
                        <td>S/{o.Ord_Total}</td>
                        <td className="delivered">{o.Ord_Estado}</td>
                        <td><button className="detail-btn" onClick={() => navigate('/admin/Detalles_Orden')}>Ver detalle</button></td>
                        </tr>
                        </>
                    ))
                }
                <tr>
                    <td>#1234</td>
                    <td>Juan Perez</td>
                    <td>20/01/2025</td>
                    <td>S/199.00</td>
                    <td className="delivered">Entregado</td>
                    <td><button className="detail-btn" onClick={() => navigate('/admin/Detalles_Orden')}>Ver detalle</button></td>
                </tr>
                <tr>
                    <td>#1234</td>
                    <td>María Gonzales</td>
                    <td>20/01/2025</td>
                    <td>S/199.00</td>
                    <td className="not-delivered">Por entregar</td>
                    <td><button className="detail-btn">Ver detalle</button></td>
                </tr>
                <tr>
                    <td>#1234</td>
                    <td>Marco Aurelio</td>
                    <td>20/01/2025</td>
                    <td>S/199.00</td>
                    <td class="delivered">Entregado</td>
                    <td><button className="detail-btn">Ver detalle</button></td>
                </tr>
            </tbody>
        </table>
            <div className="pagination">
                <button className="prev">◀</button>
                <span>1</span>
                <button className="next">▶</button>
            </div>
        </div>
    </div>
    </div>
    </>)}

export default Todas_Ordenes;