import { Link } from "react-router-dom";
import { categorias } from "../data/categoria";


function Categorias() {
    return (
        <div className="flex flex-col items-left space-y-5">
            <h1 className="text-3xl font-bold text-black-800 m-4">Categorías</h1>

            <div className="flex justify-center gap-10 flex-wrap   ">
                {categorias.map((item) => (
                    <Link key={item.categoria} to={`/categorias/${item.categoria}`}
                        className="flex flex-col items-center space-y-2 hover:scale-105">

                        <div className="w-50 h-50 rounded-full overflow-hidden shadow-md bg-green-700 flex items-center justify-center ">
                            <img
                                src={item.imagenCat}
                                alt={item.categoria}
                                className="w-35 h-30 "
                            />
                        </div>

                        <span className="text-center  font-bold text-gray-700">
                            {item.categoria}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categorias;
