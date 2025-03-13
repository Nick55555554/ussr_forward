'use client'
import Image from "next/image";
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
                    <Image
                    src={title_image}
                    alt={title}
                    fill={true}
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