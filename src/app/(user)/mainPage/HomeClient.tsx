"use client"
import title from "@/img/title.jpg"
import "./mainPage.scss"
import statistic1 from "@/img/statistic-img-1.jpg"
import statistic2 from "@/img/statistic-img-2.jpg"
import statistic3 from "@/img/statistic-img-3.jpg"
import AutoSwipper from "@/app/UI/autoswiper/Autoswiper"
import { AnimatedBox } from "@/app/UI/animatedBox/AnimatedBox"
import { useEffect, useRef, useState } from "react"
import Swiper1 from "@/app/UI/swiper/Swiper"
import { Article } from "@/app/UI/article/Article"
import { ArticlesProps, PeriodsProps } from "@/utils"

export default function HomeClientComponent({
  articles, periods
}:{
  articles:ArticlesProps[], periods:PeriodsProps[]
}){
    const [isEffectActive, setIsEffectActive] = useState(false);
    const scrollPositionRef = useRef(0);
    const tickingRef = useRef(false); 
    const [text, setText] = useState<boolean>(false)

    useEffect(() => {
    const timer = setTimeout(() => {
        setText(true)        
    }, 1000); 
    
    return () => clearTimeout(timer);
}, [])
    
    const handleScroll = () => {
        scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;

        if (!tickingRef.current) {
          window.requestAnimationFrame(() => {
          
              setIsEffectActive(prevIsEffectActive => {
                  if (scrollPositionRef.current > 1600 && !prevIsEffectActive) {
                      return true;
                  } else if (scrollPositionRef.current <= 1600 && prevIsEffectActive) {
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
        <div className={`VSS ${text ? "ani-b" : ""}`}>Великий Советский Союз,</div>
        <div className={`FORWARD ${text ? "ani-r" : ""}`}>ВПЁРЕД!</div>
            <img
            
            className="title-img"
            alt="Советский союз"
            src={title.src}
            
            />
        </div>
        <div className="split-line"></div>

      <Swiper1 children={<img alt="Цифры"/>}/>

      <div className="flex-statistic">

        <AnimatedBox>
        <div className="vignette">
          <img src = {statistic1.src} className="back-img" alt="Показатели"/>
          <h4 className="statistic-text1">Построено 10000 новых промышленных предприятий!</h4>
          <h4 className="statistic-text2">Было достигнуто первенство в производстве электроэнергии</h4>
          </div>
        </AnimatedBox>

        <AnimatedBox>
          <div className="vignette">
            <img src = {statistic2.src} className="back-img"  alt="Показатели" />
            <h4 className="statistic-text1">Количество образованных людей выросло на 50%</h4>
            <h4 className="statistic-text2">Было построено более 30000 километров железных дорог!</h4>
          </div>
        </AnimatedBox>
        
        </div>
        
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
        <AutoSwipper periods={periods}/>
    </div>
  );
}
