'use client'
import { useState, useEffect } from "react";
import "./styles.scss"
interface SectionBookPartProps{
    id: number;
    title: string;
    author?:string;
    title_image: string
}
const SectionBookPart: React.FC<SectionBookPartProps> = (
    {id, title, author, title_image}) =>
{
    const handleButton = () => {
        window.open(`https://www.chitai-gorod.ru/search?phrase=${title}`)
    }
    return(
        <div className="SectionBookPart">
                    <img
                    src={title_image}
                    alt={title}
                    
                    className="sect-img
                    "
                />
                <button className="
                sectbook
                sect-btn"
                onClick={handleButton}>
                    Купить
                </button>
                <h5 className="text-center whitespace-nowrap pt-2">{title}</h5>
        </div>
    )
}
export default SectionBookPart;