"use client" 
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import "./styles.scss"
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { PeriodsProps } from '@/utils';
import { useRouter } from 'next/navigation';

export default function Autoswipper(
{periods}
:
{periods:PeriodsProps[]}
) {
    const router  = useRouter()
    const periodHanlder = (id:number) => {
        if (id) {
            router.push(`/selfEducation/period/${id}`)
        }
    }
    
    return (
        <>
            <Swiper
                spaceBetween={0}
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
                modules={[Autoplay]}
            >
            {periods &&
            periods.map((period) => (
            <SwiperSlide 
            onClick={() => periodHanlder(period.id)}
            className='k'
            key={period.id}>
            {period.name}
            </SwiperSlide>
        ))}
            
        </Swiper>
        </>
    );
}
