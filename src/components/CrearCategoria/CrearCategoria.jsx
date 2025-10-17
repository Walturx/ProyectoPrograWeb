//hecho por Jean Carlo Rado-(202235056)

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";//use params para traer el parametro dinamico de la url que es el id del usuario, mientras q el navigate es para navegar entre rutas desde el codigo
import { categorias } from "../../data/categoria";
import { usuarios } from "../../data/usuarios";
import "./CrearCategoria.css";

export default function CrearCategoria() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const usuario = usuarios.find(u => u.id === parseInt(usuarioId));//usa el find para buscar mi usuario

  // Validación: solo admin puede crear
  if (!usuario || usuario.admin !== 1) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Acceso denegado. Solo administradores.</p>;
  }

  // Estados para el formulario
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Guardar categoría
  const handleGuardar = (e) => {
    e.preventDefault();

    if (!categoria.trim()) {//elimina los espaciados en el string original para despues ser evaluado
      alert("El nombre de la categoría es obligatorio");//si al evaluar ,se da cuenta que esta vacío ,manda alerta
      return;
    }
    //si no esta vacio ,procede a agregar
    // Agregar nueva categoría al array con push
    categorias.push({
      categoria,
      descripcion, 
      imagenCat: "" ,
      id:categorias[categorias.length - 1].id + 1//como los id estan ordenados e creciente desde 1, ps lo q hace es sacar el id del ultimo idx y le suma 1
    });
    alert("Categoría creada exitosamente 👍");//mensaje confirmado la creacion de categoria 

    // Redirigir al listado
    navigate(`/admin/${usuarioId}/categorias`); 
  };

  return (
    <div id="crear-categoria">
      <h2>Crear Categoría</h2>
      <form onSubmit={handleGuardar}>
        <div className="form-group">
          <label>Nombre de la categoría</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}//e.target.value es el valor del input el cual servira para el use state con el setCategoria
            placeholder="Ej: Consolas"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Escribe una breve descripción..." //No es obligatorio poner descripcion y no lo mostrara la celda en blanco debido a que en el jsx de listado usa {cat.descripcion || "Sin descripción"}, lo cual asegura que siempre se muestre un texto por defecto.
          ></textarea>
        </div>

        <div className="acciones-form">
          <button type="submit" className="btn-guardar">Guardar</button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate(`/admin/${usuarioId}/categorias`)}//si se cancela la creacion de categoria ,te regresa a la ruta del listado
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
