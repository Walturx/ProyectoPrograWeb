import React, { useEffect, useState } from "react";
import './Usuarios.css'
import { useNavigate } from "react-router-dom";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error de carga de usuarios...",err));
  }, []);

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

  return (
    <>
    <div className="container">
       <h2>Listado de usuarios</h2>
        <div className="buscador">
          <input type="text" placeholder="Buscar un usuario..." />
          <button>Buscar</button>
        </div>
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
            {usuarios.map(u => (
            <tr key={u.Us_ID}>
            <td className="usuario-foto2">
              <img src={`https://randomuser.me/api/portraits/men/${u.Us_ID}.jpg`} alt="foto" /> 
              <p> {u.Us_Name}</p></td>

            <td>{u.Us_Fecha_Reg}</td>
            { u.Us_Estado === 1 ? <td>Activado</td> : <td>Desactivado</td> }   
            <td>  <button onClick={()=> cambiarEstado(u.Us_ID, u.Us_Estado)}> {u.Us_Estado === 1 ? "Desactivar" : "Activar"}</button>
                  <button onClick= {() => navigate(`/detalles_Usuario/${u.Us_ID}`)}> Ver Detalles</button> </td>
            </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
            <button className="prev">◀</button>
            <span>1</span>
            <button className="next">▶</button>
        </div>
    </div>
    </div>
    </>
  );
}

export default Usuarios;