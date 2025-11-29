//Codigo hecho por Walter Melendez 20231805

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { useUser } from "../context/UserContext";

function NavBarHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser(); // por si en algún momento quieres usarlo aquí

  const abrirSidebar = () => setSidebarOpen(true);
  const cerrarSidebar = () => setSidebarOpen(false);

  return (
    <>
      <nav className="bg-green-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-4 px-2 py-0.5">
          {/* Botón hamburguesa */}
          <button
            className="hover:bg-green-700 p-2 rounded-md"
            onClick={abrirSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <button className="hover:bg-green-700 p-2 rounded-md text-[22px]">
            Categorías
          </button>
          <button className="hover:bg-green-700 p-2 rounded-md text-[22px]">
            Productos
          </button>
          <button className="hover:bg-green-700 p-2 rounded-md text-[22px]">
            Nosotros
          </button>
        </div>

        <button className="hover:bg-green-700 p-2 rounded-md text-[22px]">
          Ofertas 🤚
        </button>
      </nav>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={cerrarSidebar} />
    </>
  );
}

export default NavBarHome;
