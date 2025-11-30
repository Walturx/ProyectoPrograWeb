// hecho por Jean Carlo Rado-(202235056) [adaptado a backend]

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsuarioById, cambiarPasswordUsuario } from "../services/api";
import "./CambiarClave.css";

export default function CambiarClave() {
  const { usuarioId } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [actual, setActual] = useState("");
  const [nueva, setNueva] = useState("");
  const [confirmar, setConfirmar] = useState("");

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const user = await getUsuarioById(usuarioId);
        setUsuario(user);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarUsuario();
  }, [usuarioId]);

  if (cargando) return <p>Cargando...</p>;
  if (!usuario) return <p>Usuario no encontrado</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nueva !== confirmar) {
      alert("La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    if (!actual.trim()) {
      alert("Ingresa tu contraseña actual.");
      return;
    }

    if (nueva === actual) {
      alert("La nueva contraseña no puede ser igual a la actual.");
      return;
    }

    try {
      await cambiarPasswordUsuario(usuario.id, actual, nueva);
      alert("Contraseña cambiada con éxito");

      setActual("");
      setNueva("");
      setConfirmar("");

      navigate(`/usuario/${usuarioId}`);
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      alert(error.message || "No se pudo cambiar la contraseña.");
    }
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
 