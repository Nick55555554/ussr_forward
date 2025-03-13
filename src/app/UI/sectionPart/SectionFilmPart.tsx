'use client'
import Image from "next/image";

import "./styles.scss"
interface SectionBookPartProps{
    id: number;
    name: string;
    director:string;
    title_image: string
}

const SectionFilmPart: React.FC<SectionBookPartProps> = (
    {id, name, director, title_image}) =>
{
    const handleButton = () => {
        window.open(`https://www.kinopoisk.ru/index.php?kp_query=${name}`)
    }
    return(
        <div className="SectionFilmPart">
                    <Image
                    src={title_image}
                    alt={name}
                    fill={true}
                    className="sectfilm-img"
                />
                <button className="
                sectfilm
                sect-btn"
                onClick={handleButton}>
                    Подробнее
                </button>
                <h5 className="text-center whitespace-nowrap pt-2">{name}</h5>
        </div>
    )
}
export default SectionFilmPart;