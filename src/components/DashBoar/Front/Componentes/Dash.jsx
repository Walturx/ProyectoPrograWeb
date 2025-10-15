import React from 'react';
import './Dash.css';

function Dash(){
    return(
        <div>
            <div className ="dash">
                <h2>DashBoard</h2>
            </div>

            <div className="dashboard">
                <div className="dashboard-card">
                    <h2>Órdenes</h2>
                    <p>68</p>
                </div>
                <div className="dashboard-card">
                    <h2>Usuarios nuevos</h2>
                    <p>12</p>
                </div>
                <div className="dashboard-card">
                    <h2>Ingresos totales</h2>
                    <p>S/2348.00</p>
                </div>
            </div>
        </div>
    );
}
export default Dash;