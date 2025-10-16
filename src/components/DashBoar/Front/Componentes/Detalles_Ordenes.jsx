import './Detalles_Ordenes.css';

function Detalles_Ordenes(){

    return(
    <div>
  <div className="container">
    <h1>Detalles de <span>Órden</span></h1>

    <div className="order-card">
      <div className="order-header">
        <h2>Orden <span className="order-id">#1234</span></h2>
        <div class="order-info">
          <p><strong>Estado:</strong> <span className="status entregado">Entregado</span></p>
          <p><strong>Monto total:</strong> S/400.00</p>
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
          <tr>
            <td><span className="id">#0223</span></td>
            <td className="product">
              
              <span>Mario Kart</span>
            </td>
            <td><strong>Videojuegos</strong></td>
            <td>10</td>
            <td>S/19.00</td>
          </tr>
          <tr>
            <td><span className="id">#6425</span></td>
            <td className="product">
              
              <span>2K26</span>
            </td>
            <td><strong>Videojuegos</strong></td>
            <td>4</td>
            <td>S/19.00</td>
          </tr>
          <tr>
            <td><span className="id">#2344</span></td>
            <td class="product">
              
              <span>Nintendo Switch with Joy</span>
            </td>
            <td><strong>Consola</strong></td>
            <td>4</td>
            <td>S/19.00</td>
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
  </div>)
  }

  export default Detalles_Ordenes;