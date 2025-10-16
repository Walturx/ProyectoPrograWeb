//Codigo hecho por Walter Melendez 20231805

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com" aria-label="Facebook">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/960px-Facebook_logo_%28square%29.png"
                                    alt="Facebook"
                                    className="w-10 h-10 hover:opacity-70"
                                />
                            </a>
                            <a href="#" aria-label="X">
                                <img
                                    src="https://img.freepik.com/vector-gratis/nuevo-diseno-icono-x-logotipo-twitter-2023_1017-45418.jpg?semt=ais_hybrid&w=740&q=80"
                                    alt="Twitter/X"
                                    className="w-10 h-10 hover:opacity-70"
                                />
                            </a>
                            <a href="#" aria-label="Instagram">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png"
                                    alt="Instagram"
                                    className="w-10 h-10 hover:opacity-70"
                                />
                            </a>
                            <a href="#" aria-label="YouTube">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
                                    alt="YouTube"
                                    className="w-10 h-10 hover:opacity-70"
                                />
                            </a>
                        </div>

                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Nosotros</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Conócenos</li>
                            <li>Responsabilidad social</li>
                            <li>Nuestras tiendas</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Atención al cliente</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Atención al cliente</li>
                            <li>Horarios de atención</li>
                            <li>Preguntas frecuentes</li>
                        </ul>
                    </div>

                    {/* Políticas y condiciones */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Políticas y condiciones</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Políticas de datos personales</li>
                            <li>Condición de promociones</li>
                            <li>Términos y condiciones</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
