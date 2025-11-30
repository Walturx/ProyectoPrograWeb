//Codigo hecho por Jarol Yagami 20234801

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detalles_Usuarios.css'
import { getUsuarioById } from "../../services/api";

function Detalles_Usuarios() {
  const {id} = useParams();
  const [Usuario, setUsuario] = useState(null);

useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await getUsuarioById(id); 
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    cargarUsuario();
  }, []);


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
              <h1><strong>{Usuario.nombre}</strong></h1> <br />
              <p>Correo: {Usuario.email}</p> <br />
              <p>Fecha de registro: {Usuario.fecharegistro}</p> <br />
              { Usuario.estado === 'activo' ? <p>Estado: Activo</p> : <p>Estado: Desactivado</p> }   <br />
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