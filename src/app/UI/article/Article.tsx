"use client"
import { useState } from "react";
import "./styles.scss"
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ArticlesProps } from "@/utils";


export const Article: React.FC<ArticlesProps> = ({id, content, author, title, image,theme}) => {
    const [onMouse, setOnMouse] = useState<boolean>(true);
    const handleMouseEnter = () => {
        setOnMouse(false);
    }
    const handleMouseLeave = () => {
        setOnMouse(true);
    }
    const router = useRouter();
    const toArticle = () => {
        if (router) {
            router.push(`/article/${id}`);
        } else {
            console.error('Router is not available');
        }
    };
    

    return(
        <div className="artikel" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div className="article_face">
            <div className="article_label">{title}</div>
            {onMouse ? 
            <div className="article_theme">{theme}</div>
            : 
            <div className="article_author">{author}</div>}
        </div>
        <div className={`${onMouse ? "start_text": "many_text" }`}>
            {content}
            </div>
        <img src={image} className={`${onMouse ? "": "invisible" } img`} alt="Фото"/>
        <div className={`${onMouse ? "": "line" }`}></div>
        {!onMouse ?
        <div className="details" onClick={toArticle}>
            <span className="url_to_details" >Подробнее </span>
            <FaArrowRight size={28}/>
        </div> : ""}
    </div>
    )
}