import { BooksProps, FilmsProps, PeriodsProps, PersonalitiesProps, url } from "@/utils";

export type FormValues = {
    author: string
    theme: string
    content: string
    title: string
    image: string
}
export const submitArticle = async (data: FormValues) => {
    const response = await fetch(`${url}/api/articles/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка ответа сервера:', errorText); 
        throw new Error('Ошибка при отправке данных');
    }

    return response.json();
};

export const submitPeriod = async (data: PeriodsProps) => {
    const response = await fetch(`${url}/api/periods/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка ответа сервера:', errorText); 
        throw new Error('Ошибка при отправке данных');
    }

    return response.json();
};

export const addPerson = async (data: PersonalitiesProps) => {
    const response = await fetch(`${url}/api/periods/person/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка ответа сервера:', errorText); 
        throw new Error('Ошибка при отправке данных');
    }

    return response.json();
};

export const addBook = async (data: BooksProps) => {
    const response = await fetch(`${url}/api/periods/book/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка ${response.status}:`, errorText);
        throw new Error(`Ошибка при отправке данных: ${errorText}`);
    }
    const res = response.json()
    return res;
};

export const addMovie = async (data: FilmsProps) => {
    const response = await fetch(`${url}/api/periods/movie/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка ответа сервера:', errorText); 
        throw new Error('Ошибка при отправке данных');
    }

    return response.json();
};

