// Codigo hecho por Samantha Rodriguez
function Producto({
  id,
  nombre,
  categoria,
  precio,
  cantidad,
  seleccionado,
  imagen,
  onCantidadChange,
  onSeleccionChange
}) {
  return (
    <div className="producto">
      <input
        type="checkbox"
        className="seleccion"
        checked={seleccionado}
        onChange={() => onSeleccionChange(id)}
      />
      <img src={imagen} alt={nombre} />
      <div className="info">
        <p><b>{nombre}</b></p>
        <p>{categoria}</p>
        <p className="precio" data-precio={precio}>S/ {precio}</p>
        <div className="cantidad">
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            min="1"
            onChange={(e) => onCantidadChange(id, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Producto;

