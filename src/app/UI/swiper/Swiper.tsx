"use client" 
import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import "./styles.scss"
import 'swiper/css/pagination';
import "swiper/css/effect-fade"
import { Pagination } from 'swiper/modules';


const Swiper1 = () => {
    
    return (
        <>
        <h1 className='let40'>В период 1917-1956 гг. * </h1>
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
            <h2 className='main-h2'>
                    В 20 раз
                </h2>
                <h5 className='main-h6'>
                    Возросло производство промышленной продукции на душу населения
                </h5>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="inSlide">
                <h1 className='main-h2'>В 5 раз</h1>
                <h5 className='main-h6'>
                    Возросли доходы от сельского хозяйства 
                </h5>
            </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="inSlide">
                <h2 className='main-h2'>
                    В 12 раз
                </h2>
                <h5 className='main-h6'>
                    Поднялись национальные доходы на душу населения
                </h5>
            </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">
                <h2 className='main-h2'>
                    В 9 раз
                </h2>
                <h5 className='main-h6'>
                
                    Возросла добыча нефти
                    Возросла<br/>производительность труда рабочих<br/>
                    Возросла добыча чугуна

                </h5>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">
                <h2 className='main-h2'>
                    В 73 раза
                </h2>
                <h5 className='main-h6'>
                    Увеличилось производство электроэнергии
                </h5>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">
                    <h2 className='main-h2'>
                        В 13 раз
                    </h2>
                    <h5 className='main-h6'>
                        Возросла добыча угля
                    </h5>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">
                <h2 className='main-h2'>
                    В 14 раз
                </h2>
                <h5 className='main-h6'>
                    Увиличилось производство стали
                </h5>
                </div>
            </SwiperSlide>  
            <SwiperSlide>
                <div className="inSlide">
                <h2 className='main-h2'>
                    В 15 раз
                </h2>
                <h5 className='main-h6'>
                    Увеличилось производство молочных продуктов
                </h5>
                </div>
            </SwiperSlide>          <SwiperSlide>
                <div className="inSlide">
                <h2 className='main-h2'>
                    В 4 раза
                </h2>
                <h5 className='main-h6'>
                    Возросло производство хлопчатобумажных изделий
                </h5>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="inSlide">
                <h1 className='main-h2'>
                    *
                </h1>
                <h4 className='main-h6'>
                    <a href='https://vk.com/wall-61771654_6486'
                    className="text-blue-600"
                    target="_blank">
                    Больше достижений советского союза 
                    </a>

                </h4>
                </div>
            </SwiperSlide> 
        </Swiper>
        </>
    )
}
export default Swiper1;
