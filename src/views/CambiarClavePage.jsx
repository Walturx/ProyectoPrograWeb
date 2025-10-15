import React from "react";
import HeaderHome from "../components/HeaderHome";
import NavBarHome from "../components/navBarHome";
import CambiarClave from "../components/CambiarClave/CambiarClave";

export default function CambiarClavePage() {
  return (
    <div>
      <HeaderHome />
      <NavBarHome />

      <main>
        <CambiarClave />
      </main>

    </div>
  );
}
