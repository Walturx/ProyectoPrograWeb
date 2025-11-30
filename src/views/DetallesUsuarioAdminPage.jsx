import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import DetallesUsuario from "../components/DashBoar/Front/Detalles_Usuarios";

export default function DetallesUsuarioAdminPage() {
  return (
    <div >
      <HeaderHome />
      <NavBarHome />

      <main>
        <DetallesUsuario/>
      </main>


    </div>
  );
}