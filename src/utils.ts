import { atom } from "jotai";
import { atomWithStorage} from 'jotai/utils';


export const url = "http://localhost:3001" 

export const token = 'CBJYJH8-XEF4JHA-KSQC8J4-KBYT11P'

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
    title_image: string;
}

export interface BooksProps{
    id: number;
    title_image: string,
    title: string,
    author: string,
    period_id:number
}

export interface PersonalitiesProps{
    id: number;
    title_image: string,
    name: string,
    period_id:number
}

export interface FilmsProps{
    id: number;
    title_image: string,
    name: string,
    director: string,
    period_id:number
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
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        throw error;
    } 
};

export const sectionFetch = async (section:string, id:string | string[]) => {
    try {
        const response = await 
            fetch(`${url}/api/periods/${id}/${section}`, {cache:"no-cache",});

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(`Ошибка сети: ${errorMessage}`);
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Ошибка при получении постов:", error);
        throw error;
    } 
}
export const periodsAtom = atomWithStorage<PeriodsProps[]>('acticleTheme',[]);

export const getPeriods = async () => {
    const result = await fetch(`${url}/api/periods/`);
    const body = await result.json()
    return body
};

export const getPinnedArticles = (user_email:any):Promise<any> => {
    return fetch(`${url}/api/pinArticle/get`, { 
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ user_email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .catch(error => {
        console.error('Error sending data:', error);
        throw error
    });
}