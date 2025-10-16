import React, { useState } from 'react';
import { productos } from '../data/productos';
import { useContext } from "react";
import { list } from 'postcss';
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContexto";
import { useCalculoCarrito } from "../data/logicaCarrito";
function HeaderHome() {
  const { productos } = useContext(CarritoContext);
const { total } = useCalculoCarrito(productos);
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && busqueda.trim() !== "") {
      navigate(`/search/${busqueda}`);
    }
  };
  return (
    <header className="flex items-center justify-between bg-white-500 px-8 py-4 shadow-md h-30">
      <div className="flex items-center">
        <Link to={'/'}>

          <img
            src="https://gameplay.com.co/cdn/shop/files/loggp.png?v=1746397510&width=500"
            alt="logo"
            className="h-40"

          />
        </Link>
      </div>

      <div className="flex justify-center bg-white rounded-full px-4 py-2 w-250 shadow-md ">
        <input
          type="text"
          placeholder="Buscar un producto..."
          className="flex-grow text-gray-700 outline-none px-2"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="hover:bg-blue-700 px-3 py-1 rounded-full"
          onClick={() => busqueda.trim() && navigate(`/search/${busqueda}`)}
        >


          🔍
        </button>
      </div>

      <Link
        to="/carrito"
        className="bg-green-500 w-32 h-15 rounded-md flex flex-col justify-between items-start p-2 text-white hover:bg-blue-100 transition"
      >
        <span className="text-sm font-semibold text-white">Carrito</span>

        <div className="flex items-center justify-between w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218
c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 
5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 
.75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 
.75.75 0 0 1 1.5 0Z" />
          </svg>

          <span className="text-sm font-medium">S/{total.toFixed(2)}</span>
        </div>
      </Link>

      <div className="flex items-center space-x-2 ">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="user"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <span className="text-grey font-medium">Walter</span>
      </div>
    </header>
  );
}



export default HeaderHome; 