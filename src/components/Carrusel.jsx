//Codigo hecho por Walter Melendez 20231805

import React, { useRef } from 'react';
import localImg from '../assets/banner.png';
import localImg1 from '../assets/banner1.jpg';
import localImg2 from '../assets/banner3.png';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
    localImg,
    localImg1,
    localImg2
];

function Carrusel() {
    const swiperRef = useRef(null);

    return (
        <div className="w-full">

            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Pagination, Autoplay]}
                className="h-[400px] relative bg-white-500"
                autoplay={{ delay: 1200 }}
                pagination={{ clickable: true }}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`Slide ${index + 1}`}
                            className="w-screen h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>


        </div>
    );
}

export default Carrusel;
