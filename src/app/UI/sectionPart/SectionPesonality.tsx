'use client'
import "./styles.scss"
import { transliterate } from 'transliteration';

interface SectionBookPartProps{
    id: number;
    name: string;
    period_id:number;
    title_image: string
}

const SectionPersonPart: React.FC<SectionBookPartProps> = (
    {id,period_id, name, title_image}) =>
{
    const personHandler = (name:string) => {
        const transliterated = transliterate(name)
        const regex = /(?:[A-Z]\.\s*)+(.*)/
        const match = transliterated.match(regex);
        if(match){
            const lastName = match[1].trim()
            window.open(`https://gvardiya.ru/books/zhizn-zamechatelnyh-lyudey/${lastName}`)
        }
    }
    return(
        <div className="SectionPersonPart">
                <img
                src={title_image}
                alt={name}
                
                className="sect-img
                rounded-2xl
                cursor-pointer
                "
                onClick={() => personHandler(name)}
                />
                <h4 className="text-center whitespace-nowrap pt-2">{name}</h4>
        </div>
    )
}
export default SectionPersonPart;

