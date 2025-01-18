"use client"
import title from "@/img/title.jpg"
import "./mainPage.scss"
import statistic1 from "@/img/statistic-img-1.jpg"
import statistic2 from "@/img/statistic-img-2.jpg"
import statistic3 from "@/img/statistic-img-3.jpg"
import AutoSwipper from "@/app/UI/autoswiper/Autoswiper"
import { AnimatedBox } from "@/app/UI/animatedBox/AnimatedBox"
import parallax_1 from "@/img/parallax_1.jpg"
import { useEffect, useRef, useState } from "react"
import Swiper1 from "@/app/UI/swiper/Swiper"
import { Article } from "@/app/UI/article/Article"
import { ArticlesProps, RatingProps } from "@/utils"

export default function HomeClientComponent({
  articles, rating
}:{
  articles:ArticlesProps[], rating: RatingProps[]
}){
    const [isEffectActive, setIsEffectActive] = useState(false);
    const scrollPositionRef = useRef(0);
    const tickingRef = useRef(false); 
    
    const handleScroll = () => {
        scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;

        if (!tickingRef.current) {
          window.requestAnimationFrame(() => {
          
              setIsEffectActive(prevIsEffectActive => {
                  if (scrollPositionRef.current > 2000 && !prevIsEffectActive) {
                      return true;
                  } else if (scrollPositionRef.current <= 2000 && prevIsEffectActive) {
                      return false;
                  }
                  return prevIsEffectActive; 
              });
                tickingRef.current = false; 
            });
            tickingRef.current = true; 
        }
    };

    useEffect(() => {
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
    <div className={`main-frame ${isEffectActive ? "nextColor" : "firstColor"}`}>
        <div className="title-div">
        {/* <div className="quote">
          <p>Читайте,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;завидуйте,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;я
                гражданин<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Советского Союза».<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;Владимир Маяковский</p>
          </div> */}
            <img
            className="title-img"
            alt="Советский союз"
            src={title.src}/>
        </div>
        <div className="split-line"></div>
        <h1 className="bold-label">Великий Советский Союз</h1>

      <Swiper1 children={<img alt="Цифры"/>}/>

      <div className="flex-statistic">

        <AnimatedBox>
          <img src = {statistic1.src} className="back-img" alt="Показатели"/>
          <h3 className="statistic-text1">Написано книг:</h3>
          <h3 className="statistic-text2">Написано статей:</h3>
        </AnimatedBox>

        <AnimatedBox>
          <div className="vignette">
            <img src = {statistic2.src} className="back-img"  alt="Показатели"/>
            <h4 className="statistic-text1">Было обучено грамоте:</h4>
            <h4 className="statistic-text2">Было обучено русскому языку:</h4>
          </div>
      

        </AnimatedBox>
        
        </div>
        <AnimatedBox big={true}>
        
        <img src={statistic3.src} className="back-img"  alt="Показатели"/>
        <h1 className="statistic-text1">Было обучено русскому языку:</h1>

        </AnimatedBox>
        <div 
        className="flex-articles">
            {articles.map(article => (
            <AnimatedBox 
            tall={true}
            key={article.id}>
                <Article 
                id={article.id} content={article.content} author={article.author}
                title={article.title}
                image={article?.image}
                theme={article?.theme} />
              </AnimatedBox>
            ))}
        </div>
        <AutoSwipper/>
        <img src={parallax_1.src} className="parallax-img" alt="параллакс"/>
    </div>
  );
}
