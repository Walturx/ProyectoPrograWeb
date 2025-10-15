import React, { useEffect, useState } from "react";
import './Usuarios.css'

function Usuarios({mostrar, onSeleccionarUsuario}) {
  const [usuarios, setUsuarios] = useState([]);

  let lista = []
  if(mostrar === 'todos'){
    lista = usuarios
  }else{
    lista = usuarios.slice(0,5)
  }

  useEffect(() => {
    fetch("http://localhost:5000/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error de carga de usuarios...",err));
  }, []);

  return (
    <div>
      <table>
        <thead>
                <tr>
                <th>Nombre</th>
                {mostrar === "todos" && <th>Fecha registro</th>}
                <th>Estado</th>
                <th>Acciones</th>
                </tr>
        </thead>
        <tbody>
            {lista.map(u => (
            <>
            <tr key={u.Us_ID}>
            <td> {u.Us_Name}</td>
            {mostrar === "todos" && <td>{u.Us_Fecha_Reg}</td>}
            <td> {u.Us_Estado}</td>
            <td>  <button> Activado</button>
                  <button onClick={() => onSeleccionarUsuario(u.Us_ID)}> Ver Detalles</button> </td>
            </tr>
            </>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;