'use client'
import { BooksProps, FilmsProps, PersonalitiesProps } from "@/utils";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { addBook, addMovie, addPerson } from "./sumbit_Utils";
import { useEffect, useState } from "react";


export const PeriodChunks = () =>{
    const [personId, setPersonId] = useState<number>(0); 
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPersonId(parseInt(value))
        setIsTouched(true);
    }
    return(
        <>
            <div className='center'>
                <h1>Добавить в период</h1>
                <div className="idForm">
                    <input
                    className="formInput w25"
                    type="number"
                    onChange={handleIdChange}/>
                    {personId === null && isTouched && <span className="formError">Введите id</span>}

                </div>
            </div>
            <div className='flexSector'>
            <Person id={personId} />
            <Book id={personId} />
            <Movie id={personId} />
            </div>
    </>
    )
}

interface IdProps {
    id?: number; 
}


const Person = ({id}: IdProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<PersonalitiesProps>();
    const [errorId, setErrorId] = useState<boolean>(false)

    const onSubmit: SubmitHandler<PersonalitiesProps> = async (data: PersonalitiesProps) => {
        try {
            if(id == 0){
                setErrorId(true)
            }
            if (id){
                data.period_id = id;
                const result = await addPerson(data);
                console.log('Успешно отправлено:', result)
            }
            
        } catch (error) {
            console.error('Ошибка при отправке:', error)
        }
    }
    useEffect(() => console.log(id),[id])
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='formDiv'>
            <h2>Личность</h2>
            <label 
            className='formLabel'
            htmlFor="name">Название</label>
            <input
                className="formInput"
                {...register('name', { required: 'Это поле обязательно' })}
            />
            {errors.name && <span className='formError'>{(errors.name as FieldError).message}</span>} 
        </div>
        <div className='formDiv'> 
            <label 
            className='formLabel'
            htmlFor="title_image">Ссылка на иллюстрацию</label>
            <input
            className="formInput"
            {...register('title_image', { required: 'Это поле обязательно' })}
            />
                {errors.title_image && <span className='formError'>{(errors.title_image as FieldError).message}</span>} 
        </div>
        
        <button type="submit" className='accept'>Добавить</button>
        {errorId && <span className='formError'>Введите корректное id</span>} 
        </form> 
    )
}
const Book = ({id}: IdProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<BooksProps>();
    const [errorId, setErrorId] = useState<boolean>(false)

    const onSubmit: SubmitHandler<BooksProps> = async (data: BooksProps) => {
        try {
            if(id == 0){
                setErrorId(true)
                return;
            }
            if (id){
                data.period_id = id;
                const result = await addBook(data);
                console.log('Успешно отправлено:', result)
            }
        } catch (error) {
            console.error('Ошибка при отправке:', error)
        }
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='formDiv'>
            <h2>Книга</h2>
            <label 
            className='formLabel'
            htmlFor="title">Название</label>
            <input
                className="formInput"
                {...register('title', { required: 'Это поле обязательно' })}
            />
            {errors.title && <span className='formError'>{(errors.title as FieldError).message}</span>} 
        </div>
        <div className='formDiv'>
            <label 
            className='formLabel'
            htmlFor="author">Автор</label>
            <input
                className="formInput"
                {...register('author', { required: 'Это поле обязательно' })}
            />
            {errors.author && <span className='formError'>{(errors.author as FieldError).message}</span>} 
        </div>
        <div className='formDiv'> 
            <label 
            className='formLabel'
            htmlFor="title_image">Ссылка на иллюстрацию</label>
            <input
            className="formInput"
            {...register('title_image', { required: 'Это поле обязательно' })}
            />
                {errors.title_image && <span className='formError'>{(errors.title_image as FieldError).message}</span>} 
        </div>
        
        <button type="submit" className='accept'>Добавить</button>
        {errorId && <span className='formError'>Введите корректное id</span>} 
        </form> 
    )
}
const Movie = ({id}: IdProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FilmsProps>();
    const [errorId, setErrorId] = useState<boolean>(false)

    const onSubmit: SubmitHandler<FilmsProps> = async (data: FilmsProps) => {
        try {
            if(id == 0){
                setErrorId(true)
            }
            if (id){
                data.period_id = id;
                const result = await addMovie(data);
                console.log('Успешно отправлено:', result)
            }
            
        } catch (error) {
            console.error('Ошибка при отправке:', error)
        }
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='formDiv'>
            <h2>Фильм</h2>
            <label 
            className='formLabel'
            htmlFor="name">Название</label>
            <input
                className="formInput"
                {...register('name', { required: 'Это поле обязательно' })}
            />
            {errors.name && <span className='formError'>{(errors.name as FieldError).message}</span>} 
        </div>
        <div className='formDiv'>
            <label 
            className='formLabel'
            htmlFor="director">Режиссёр</label>
            <input
                className="formInput"
                {...register('director', { required: 'Это поле обязательно' })}
            />
            {errors.director && <span className='formError'>{(errors.director as FieldError).message}</span>} 
        </div>
        <div className='formDiv'> 
            <label 
            className='formLabel'
            htmlFor="title_image">Ссылка на иллюстрацию</label>
            <input
            className="formInput"
            {...register('title_image', { required: 'Это поле обязательно' })}
            />
                {errors.title_image && <span className='formError'>{(errors.title_image as FieldError).message}</span>} 
        </div>
        
        <button type="submit" className='accept'>Добавить</button>
        {errorId && <span className='formError'>Введите корректное id</span>} 
        </form> 
    )
}