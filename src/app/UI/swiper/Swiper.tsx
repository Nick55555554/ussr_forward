"use client" 
import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import "./styles.scss"
import 'swiper/css/pagination';
import "swiper/css/effect-fade"
import { Pagination } from 'swiper/modules';

interface SwiperProps{
    children: ReactNode;
}

const Swiper1: React.FC<SwiperProps> = ({ children }) => {
    
    return (
        <>
        <Swiper
            spaceBetween={20}
            modules={[Pagination]}
            centeredSlides={true}
            breakpoints={{
                870:{
                    slidesPerView:3,
                },
                550:{
                    slidesPerView: 2,
                },
                0:{
                    slidesPerView: 1,
                },
            }}
            effect= 'fade'
            speed={500}
            className="mySwiper"
        >
            <SwiperSlide>
            <div className="inSlide">
                <h2 className='main-h2'>3 миллиона людей</h2>
                <h6 className='main-h6'>
                    Было вылечено от холеры 
                </h6>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="inSlide">
                <h2 className='main-h2'>
                    6 миллионов людей
                </h2>
                <h6 className='main-h6'>
                    Было освобождено амнистией 1963 года
                </h6>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="inSlide">1</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">1</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">1</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">1</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">1</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">1341</div>
            </SwiperSlide>            <SwiperSlide>
                <div className="inSlide">1134</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">1341</div>
            </SwiperSlide>

            

        </Swiper>
        </>
    )
}
export default Swiper1;
