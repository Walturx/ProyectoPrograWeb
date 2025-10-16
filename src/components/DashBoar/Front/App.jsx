import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import Dash from './Componentes/Dash.jsx';
import Usuarios from './Componentes/Usuarios.jsx';

function App() {
  const navigate = useNavigate();

  const irATodos_Usuarios = () => {
    navigate("/usuarios"); 
  };  

  const irATodos_Ordenes = () => {
    navigate("/ordenes");
  };

  return (
    <div>
      
      <Dash/>

        <div className="detalles1">
            <div className="d1">

                <section className="users">

                <div className='barraUsuarios'>
                <h3>Usuarios registrados</h3>
                <button className='todosUsuarios' 
                onClick={irATodos_Usuarios} 
                >Ver todos los Usuarios</button>
                </div>

                <Usuarios />
                </section>
                <div className="pagination">
                    <button className="prev">◀</button>
                    <span>1</span>
                <button className="next">▶</button>
                </div>
            </div>


            <div className="d2">
                <section className="user-detail">
                <h3>Detalle del usuario</h3>
                <div className="user-info">
                <div className="user-photo">
                    <img alt="Foto de Juan Perez" id='fotoRad'/>
                </div>
                <div className="user-data">
                </div>
                </div>

        <h4>Órdenes</h4>
        <table>
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Fecha</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#1234</td>
                    <td>20/01/2025</td>
                    <td>S/199.00</td>
                </tr>
            </tbody>
        </table>
        <div className="pagination">
            <button className="prev">◀</button>
            <span>1</span>
            <button className="next">▶</button>
        </div>
    </section>
    </div>
    </div>
        <div className='barraOrdenes'>
            <h3>Listado Ordenes</h3>
            
            <button>Ver Productos</button>
            <button onClick={irATodos_Ordenes}>Ver Todas las Ordenes</button>
            
        </div>
        <div>

        </div>
        <div className="pagination">
            <button className="prev">◀</button>
            <span>1</span>
            <button className="next">▶</button>
        </div>
    </div>
  );
}

export default App;
