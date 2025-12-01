//Codigo hecho por Jarol Yagami 20234801
import React, { useEffect, useState } from "react";
import './Detalles_Ordenes.css';
import { useNavigate, useParams } from "react-router-dom";
import { getOrdenById, getItemsByOrden, getProductoById } from '../../services/api';

function Detalles_Ordenes(){
    const {id} = useParams();
    const [Orden, setOrden] = useState(null);
    const [ItemsDetallados, setItemsDetallados] = useState([]);

    useEffect(() => {
      const cargarOrden = async () => {
        try {
          const data = await getOrdenById(id);
          setOrden(data);
        } catch (error) {
          console.error("Error al obtener detalle de orden:", error);
        }
      };

      cargarOrden();
    }, [id]);

    //obtener items
    useEffect(() => {
        const cargarItemsYProductos = async () => {
         try {
          const itemsData = await getItemsByOrden(id);
             
            const promesasProductos = itemsData.map(item => 
                getProductoById(item.idproducto)
            );
            const productos = await Promise.all(promesasProductos);
            
            const resultadosFinales = itemsData.map((item, index) => ({
                ...item,
                producto: productos[index] 
            }));

          setItemsDetallados(resultadosFinales); 
        } catch (error) {
       console.error("Error al obtener items y productos:", error);
     }
 };

 cargarItemsYProductos();
 }, [id]); 

   if (!Orden) { 
 return (
          <div className="container">
          <h1>Cargando detalles de orden...</h1>
          </div>
      );
      } 
  
    const items = ItemsDetallados;

    return(
    <div>
  <div className="container">
    <h1>Detalles de <span>Órden</span></h1>

    <div className="order-card">
      <div className="order-header">
        <h2>Orden <span className="order-id">#{Orden.id}</span></h2>
        <div className="order-info">
          <p><strong>Estado:</strong> <span className="status entregado">{Orden.estado}</span></p>
          <p><strong>Monto total:</strong> {Orden.total}</p>
        </div>
      </div>

      <h3>Productos ordenados</h3>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5">No hay productos en esta orden.</td>
            </tr>  
              ):(
          items.map((item) => (
          <tr>
            <td><span className="id">#{item.id}</span></td>
            <td className="product">
              <span>{item.producto.nombre}</span>
            </td>
            <td><strong>{item.producto.categoria}</strong></td>
            <td>{item.cantidad}</td>
            <td>{item.preciounitario * item.cantidad}</td>
          </tr>
              )))}
        </tbody>
      </table>
        <div className="pagination">
            <button className="prev">◀</button>
            <span>1</span>
            <button className="next">▶</button>
        </div>
    </div>
  </div>
  </div>)
  }

  export default Detalles_Ordenes;