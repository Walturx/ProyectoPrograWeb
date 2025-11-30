//Codigo hecho por Walter Melendez 20231805

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getProductos } from "./services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import { CarritoContext } from "../context/CarritoContexto";


function Productos() {
    const { agregarProducto } = useContext(CarritoContext)
    const [productos, setProductos] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const cargarProductor = async () => {
            try {
                setloading(true)
                const data = await getProductos()
                setProductos(data)
            } catch (error) {
                console.error("Error cargando productos:", error)
            } finally {
                setloading(false)
            }
        }
        cargarProductor()
    }, [])
    if (loading) return <p className="p-10 text-xl">Cargando productos...</p>;
    if (!productos.length) return <p className="p-10">No hay productos disponibles.</p>;

    return (
        <div className="flex flex-col items-left space-y-8 m-4">
            <h1 className="text-3xl font-bold text-black">Lo más vendido</h1>

            <div className="flex justify-center gap-10 flex-wrap">
                {productos.slice(0, 10).map((item) => (
                    <Link
                        key={item.id}
                        to={`/producto/${item.id}`}
                        className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col justify-between cursor-pointer no-underline"
                    >
                        <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="w-40 h-40 mx-auto object-cover "
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-800">{item.nombre}</h2>
                            <p className="text-sm text-gray-600 mt-1">{item.categoria}</p>
                            <p className="m-1 text-green-700 font-semibold text-left">
                                S/{Number(item.precio).toFixed(2)}
                            </p>

                            <button
                                onClick={() => {
                                    agregarProducto(item);
                                }
                                }
                                className=" mt-20  flex items-center bg-green-600 text-white rounded-md hover:bg-blue-100 transition px-4 py-2">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218
                c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25
                5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0
                .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0
                .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                                Agregar al carrito
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Productos;
