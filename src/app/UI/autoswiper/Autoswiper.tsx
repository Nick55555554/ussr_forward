"use client" 
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import "./styles.scss"
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

export default function App() {
    
    return (
        <>
        <Swiper
                spaceBetween={0}
                modules={[Autoplay]}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false, 
                }}
            breakpoints={{
                870:{
                    slidesPerView: 6,
                },
                550:{
                    slidesPerView: 4,
                },
                0:{
                    slidesPerView: 2,
                },
            }}
            className="myAutoSwiper"
            speed={500}
            loop={true}
        >
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='inAutoSwiper'>
                    132424
                </div>
            </SwiperSlide>
        </Swiper>
        </>
    );
}
