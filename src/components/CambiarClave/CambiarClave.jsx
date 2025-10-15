import { useState } from "react";
import { useParams } from "react-router-dom";
import { usuarios } from "../../data/usuarios"; // base de datos de usuario
import "./CambiarClave.css";

export default function CambiarClave() {
  const { usuarioId } = useParams(); // obtener el id desde la URL
  const usuario = usuarios.find(u => u.id === parseInt(usuarioId));

  if (!usuario) return <p>Usuario no encontrado</p>;

  const [actual, setActual] = useState("");//contraseña actual
  const [nueva, setNueva] = useState(""); //nueva contraseña
  const [confirmar, setConfirmar] = useState("");//confirmar nueva contraseña repitiendolo

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

    usuario.password = nueva; // actualizar contraseña
    alert("Contraseña cambiada con éxito");

    // limpiar campos
    setActual("");
    setNueva("");
    setConfirmar("");
  };

  return (
    <div id="cambiar-contrasena">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <h3>Contraseña actual</h3>
        <input
          type="password"
          value={actual}
          onChange={e => setActual(e.target.value)}//cada vez que escribes en el input, React guarda el valor en el estado actual
          placeholder="Contraseña actual"
          required
        />
        <h3>Nueva contraseña</h3>
        <input
          type="password"
          value={nueva}
          onChange={e => setNueva(e.target.value)}
          placeholder="Nueva contraseña"
          required //cada vez que escribes en el input, React guarda el valor en el estado actual
        />
        <h3>Confirmar contraseña</h3>
        <input
          type="password"
          value={confirmar}
          onChange={e => setConfirmar(e.target.value)}//cada vez que escribes en el input, React guarda el valor en el estado actual
          placeholder="Confirmar contraseña"
          required
        />
        <button type="submit" id="btn-cambiar">Cambiar</button>
      </form>
    </div>
  );
}
