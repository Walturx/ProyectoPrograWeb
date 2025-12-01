//Codigo hecho por Jarol Yagami 20234801

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrdenes } from "../../services/api";

function Todas_Ordenes(){

const navigate = useNavigate();
const [Ordenes , setOrdenes] = useState([]);
const [busqueda, setBusqueda] = useState("");

useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const data = await getOrdenes(); 
        setOrdenes(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    cargarOrdenes();
  }, []);

  //busqueda
  const ordenesFiltrados = Ordenes.filter((u) =>
    (u?.nombre?.toLowerCase() ?? "").includes(busqueda.toLowerCase())
  );


  //paginación


  const [inferior, setInferior] = useState(0);
  const [superior, setSuperior] = useState(4);
  const ordenesPaginados = ordenesFiltrados.slice(inferior, superior);
  
  const siguientePagina = () => {
    if (superior < ordenesFiltrados.length) {
      setInferior(inferior + 4);
      setSuperior(superior + 4);
    }
  };

  const anteriorPagina = () => {
    if (inferior > 0) {
      setInferior(inferior - 4);
      setSuperior(superior - 4);
    }
  };

  const paginaActual = Math.floor(inferior / 4) + 1;
  const totalPaginas = Math.ceil(ordenesFiltrados.length / 4);

return(
    <>
<div>
    <div className="container">
        <h1>Listado de órdenes</h1>
        <div className="buscador">
          <input type="text" placeholder="Buscar por id usuario..."  value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
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
                    {ordenesFiltrados.length > 0 ? ( ordenesPaginados.map((o) => (
                        <>
                        <tr>
                        <td>#{o.id}</td>
                        <td>{o.idusuario}</td>
                        <td>{o.fecha}</td>
                        <td>S/{o.total}</td>
                        <td className="delivered">{o.estado}</td>
                        <td><button className="detail-btn" onClick={() => navigate(`/admin/Detalles_Orden/${o.id}`)}>Ver detalle</button></td>
                        </tr>
                        </>
                    ))):(<tr>
                        <td colSpan="6">No se encontraron órdenes.</td>
                        </tr>)}
                
            </tbody>
        </table>
            <div className="pagination">
            <button className="prev" onClick={anteriorPagina} disabled={inferior === 0}>◀</button>
            <span> {paginaActual} / {totalPaginas} </span>
            <button className="next" onClick={siguientePagina} disabled={superior >= ordenesFiltrados.length}>▶</button>
        </div>
        </div>
    </div>
    </div>
    </>)}

export default Todas_Ordenes;