'use client'
import { FilmsProps, sectionFetch, token } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./styles.scss"
import SectionFilmPart from "@/app/UI/sectionPart/SectionFilmPart";


export default function FilmClient(){
    const {id} = useParams()
    const [books, setBooks] = useState<FilmsProps[]>([])
    useEffect(() => {
        if(id){
            const booksFetch = async () => {
                const newBooks = await sectionFetch('movies',id)
                setBooks(newBooks)
            }
            booksFetch()
        }

    },[id])
    
    return(
        <div className="films-page">
            <div className="SectionFilmsParts">
                {books &&
                books.map((film) => (
                    <SectionFilmPart
                    id={film.id}
                    director={film.director}
                    title_image={film.title_image}
                    name={film.name}
                    key={film.id}
                    />
                ))
                }
            </div>

        </div>
    )
}