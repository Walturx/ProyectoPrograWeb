import React, { useEffect, useState } from "react";
import './Usuarios.css'
import { useNavigate } from "react-router-dom";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  //datos
  useEffect(() => {
    fetch("http://localhost:5000/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error de carga de usuarios...",err));
  }, []);

  //Estado
  const cambiarEstado = async(id, estadoActual)=>{
  const nuevoEstado = estadoActual === 1? 0:1;

  try {
    const res = await fetch(`http://localhost:5000/usuarios/${id}/estado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Us_Estado: nuevoEstado })
    });

    if (!res.ok) throw new Error("Error al actualizar estado");

    setUsuarios(usuarios.map(u =>
      u.Us_ID === id ? { ...u, Us_Estado: nuevoEstado } : u
    ));
  } catch (err) {
    console.error(err);
  }
  };

  //busqueda
  const usuariosFiltrados = usuarios.filter((u) =>
    u.Us_Name.toLowerCase().includes(busqueda.toLowerCase())
  );


  //paginación


  const [inferior, setInferior] = useState(0);
  const [superior, setSuperior] = useState(8);
  const usuariosPaginados = usuariosFiltrados.slice(inferior, superior);
  
  const siguientePagina = () => {
    if (superior < usuariosFiltrados.length) {
      setInferior(inferior + 8);
      setSuperior(superior + 8);
    }
  };

  const anteriorPagina = () => {
    if (inferior > 0) {
      setInferior(inferior - 8);
      setSuperior(superior - 8);
    }
  };

  const paginaActual = Math.floor(inferior / 8) + 1;
  const totalPaginas = Math.ceil(usuariosFiltrados.length / 8);


  return (
    <>
    <div className="container">
       <h2>Listado de usuarios</h2>
      <br />
        <div className="buscador">
          <input type="text" placeholder="Buscar un usuario..."  value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
        </div>
      <br />
      <div className="order-card">
      <table>
        <thead>
                <tr>
                <th>Nombre</th>
                <th>Fecha registro</th>
                <th>Estado</th>
                <th>Acciones</th>
                </tr>
        </thead>
        <tbody>
            {usuariosFiltrados.length > 0 ? ( usuariosPaginados.map((u) => (
            <tr key={u.Us_ID}>
            <td className="usuario-foto2">
              <img src={`https://randomuser.me/api/portraits/men/${u.Us_ID}.jpg`} alt="foto" /> 
              <p> {u.Us_Name}</p></td>

            <td>{u.Us_Fecha_Reg}</td>
            { u.Us_Estado === 1 ? <td>Activado</td> : <td>Desactivado</td> }   
            <td>  <button onClick={()=> cambiarEstado(u.Us_ID, u.Us_Estado)}> {u.Us_Estado === 1 ? "Desactivar" : "Activar"}</button>
                  <button onClick= {() => navigate(`/admin/detalles_Usuario/${u.Us_ID}`)}> Ver Detalles</button> </td>
            </tr>
            ))
            ): (<tr>
                  <td colSpan="4">No se encontraron usuarios.</td>
                </tr>)}
        </tbody>
      </table>
      <br />
      <div className="pagination">
            <button className="prev" onClick={anteriorPagina} disabled={inferior === 0}>◀</button>
            <span> {paginaActual} / {totalPaginas} </span>
            <button className="next" onClick={siguientePagina} disabled={superior >= usuariosFiltrados.length}>▶</button>
        </div>
    </div>
    </div>
    </>
  );
}

export default Usuarios;