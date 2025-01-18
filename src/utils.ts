import { atom } from "jotai";

export const url = "http://localhost:3001" 


export const searchTextAtom = atom('');


export interface ArticlesProps{
    id: number,
    content: string,
    author: string,
    title: string,
    image: string,
    theme: string,
    illustrations?: string[];
    readers?: number;
    created_at?: Date;
    date?: number;
    rate?: number;
}
export interface RatingProps{
    id: number;
    user_email: string;
    article_id: number;
    degree: number;
}
export interface PeriodsProps{
    id: number;
    name: string;
    start_date: string;
    end_date:string;
    title_image: {
        type: string;
        data: number[];
    }
}

export const getArticles = async () => {
    try {
        const result = await fetch(`${url}/api/articles/`);
        
        if (!result.ok) {
            throw new Error(`Ошибка сети: ${result.status} ${result.statusText}`);
        }

        return await result.json();
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        throw error;
    }
};
export const handleRating = async () => {
            
    try {
        const responseArticles = await 
            fetch(`${url}/api/rateArticle/getAll`);

        if (!responseArticles.ok) {
            const errorMessage = await responseArticles.text(); 
            throw new Error(`Ошибка сети: ${errorMessage}`);
        }

        return await responseArticles.json();
    } catch (err) {

    } 
};
