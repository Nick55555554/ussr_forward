'use client'
import SectionBookPart from "@/app/UI/sectionPart/SectionBookPart"
import { BooksProps, sectionFetch } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./styles.scss"

export default function BooksClient(){
    const {id} = useParams()
    const [books, setBooks] = useState<BooksProps[]>([])
    useEffect(() => {
        if(id){
            const booksFetch = async () => {
                const newBooks = await sectionFetch('books',id)
                setBooks(newBooks)
            }
            booksFetch()
        }

    },[id])
    return(
        <div className="books-page">
            <div className="SectionBookParts">
                {books &&
                books.map((book) => (
                    <SectionBookPart
                    id={book.id}
                    author={book.author}
                    title_image={book.title_image}
                    title={book.title}
                    key={book.id}
                    />
                ))
                }
            </div>
        </div>
    )
}