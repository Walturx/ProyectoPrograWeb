import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import Footer from "../components/footer";
import DetalleUsuario from "../components/DetalleUsuario/DetalleUsuario";

function DetalleUsuarioPage() {
  return (
    <div >
      <HeaderHome />
      <NavBarHome />

      <main >
        <DetalleUsuario />
      </main>

      <Footer />
    </div>
  );
}

export default DetalleUsuarioPage;
