import React, { useEffect, useState } from "react";

function Detalles_Usuarios({ id }) {
  const [Usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

   useEffect(() => {
    if (!id) return; // si no hay id, no hace nada

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

  if (!id) {
    return <p>Selecciona un usuario para ver los detalles.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Usuario) {
    return <p>Cargando...</p>;
  }
    return(
    <>      
            <p><strong>{Usuario.Us_Name}</strong></p>
            <p>Correo: {Usuario.Us_Correo}</p>
            <p>Fecha de registro: {Usuario.Us_Fecha_Reg}</p>
            <p>Estado: {Usuario.Us_Estado}</p>
    </>
)
}

export default Detalles_Usuarios;