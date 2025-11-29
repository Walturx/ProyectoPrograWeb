// hecho por Jean Carlo Rado-(202235056)
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usuarios } from "../../data/usuarios"; // base de datos de usuario
import "./CambiarClave.css";

export default function CambiarClave() {
  const { usuarioId } = useParams(); // obtener el id desde la URL
  const navigate = useNavigate();

  const usuario = usuarios.find((u) => u.id === parseInt(usuarioId));
  if (!usuario) return <p>Usuario no encontrado</p>;

  const [actual, setActual] = useState(""); // contraseña actual
  const [nueva, setNueva] = useState(""); // nueva contraseña
  const [confirmar, setConfirmar] = useState(""); // confirmar nueva contraseña

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nueva !== confirmar) {
      alert("La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    if (actual !== usuario.password) {
      alert("Contraseña actual incorrecta.");
      return;
    }

    if (nueva === actual) {
      alert("La nueva contraseña no puede ser igual a la actual.");
      return;
    }

    
    usuario.password = nueva;

    alert("Contraseña cambiada con éxito");

    // limpiar campos
    setActual("");
    setNueva("");
    setConfirmar("");

    // regresar a la página de detalle del usuario 
    navigate(`/usuario/${usuarioId}`);
  };

  return (
    <div className="screen">
      <div className="page-container">
        <div id="cambiar-contrasena">
          <h2>Cambiar Contraseña</h2>
          <form id="form-contrasena" onSubmit={handleSubmit}>
            <h3>Contraseña actual</h3>
            <input
              type="password"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              placeholder="Contraseña actual"
              required
            />
            <h3>Nueva contraseña</h3>
            <input
              type="password"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
              placeholder="Nueva contraseña"
              required
            />
            <h3>Confirmar contraseña</h3>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              placeholder="Confirmar contraseña"
              required
            />
            <button type="submit" id="btn-cambiar">
              Cambiar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
