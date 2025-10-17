//Codigo hecho por Jarol Yagami 20234801

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detalles_Usuarios.css'

function Detalles_Usuarios() {
  const {id} = useParams();
  const [Usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

   useEffect(() => {
    if (!id) return; 

    fetch(`http://localhost:5000/usuarios/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuario");
        return res.json();
      })
      .then((data) => setUsuario(data))
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el usuario");
      });
  }, [id]);


  if (!Usuario) {
    return <p>Cargando...</p>;
  }
    return(
    <>      <div className="container">
                <br />
                <div className="barra">
                    <h2>Detalles de usuario</h2> 
                    <button>Cambiar contraseña</button>
                </div>
                <br />
            <div className="order-card">
            <div className="usuario-info">
              <div>
              <h1><strong>{Usuario.Us_Name}</strong></h1> <br />
              <p>Correo: {Usuario.Us_Correo}</p> <br />
              <p>Fecha de registro: {Usuario.Us_Fecha_Reg}</p> <br />
              { Usuario.Us_Estado === 1 ? <p>Estado: Activo</p> : <p>Estado: Desactivado</p> }   <br />
              </div>
              
              <div className="usuario-foto">
                <img src={`https://randomuser.me/api/portraits/men/${id}.jpg`} alt="fotode" />
              </div>
            </div>
            
            <div className="usuario_ordenes">
              <br />
              <h1>Útimas Órdenes</h1>
            <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((n) => (
                <tr key={n}>
                  <td className="id">#{Math.floor(1000 + Math.random() * 9000)}</td>
                  <td>20/0{n}/2025</td>
                  <td>S/{199.0}</td>
                  <td>
                    <button className="btn-verdetalle">Ver detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
            </div>
            </div>
    </>
)
}

export default Detalles_Usuarios;