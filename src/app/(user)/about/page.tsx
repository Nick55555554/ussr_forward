"use client"
import { useEffect, useState } from "react";
import "./styles.scss"

export default function About(){
    const [text, setText] = useState<boolean>(false)
    useEffect(() => {
    const timer = setTimeout(() => {
        setText(true)        
        console.log(text)
    }, 1000); 

    return () => clearTimeout(timer);
}, [])
    return(
        <div className="about_page">
            <div className="text_grid">
            <h1 className="about"
            >О проекте
            </h1>
                <div className={`text text1 ${text ? "visible" : ''}`}>
                    <div className="line"></div>
                    СССР ВПЕРЁД - это образовательный ресурс, созданный для просвещение молодого поколения в области советского времени
                </div>
                <div className={`text text2 ${text ? "visible" : ''}`}>
                Сайт предлагает к прочтению ряд статей различной тематики: от действий революционной разведки в годы гражданской войны до движения стиляг в 60-х.<br/>Также вы можете ознакомиться с набором книг и фильмов по историческим периодам советской эпохи. 
                </div>
            </div>
        </div>
    )
}