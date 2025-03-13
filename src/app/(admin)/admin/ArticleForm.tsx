'use client'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, submitArticle } from './sumbit_Utils';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { url } from '@/utils';



export const ArtcileForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const {data: session} = useSession()
    const router = useRouter();
    const onSubmit: SubmitHandler<FormValues> = async (data:FormValues) => {
        try {
            await submitArticle(data); 
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    }
    
    useEffect(() => {
        if(session?.user?.email != 'nick.grathev.2006@gmail.com'){
            router.replace(`${url}`)
        }
    },[session?.user?.email, router])
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='formDiv'>
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
                htmlFor="theme">Тема</label>
                <input
                className="formInput"
                {...register('theme', { required: 'Это поле обязательно' })}
                />
                    {errors.theme && <span className='formError'>{(errors.theme as FieldError).message}</span>} 
            </div>

            <div className='formDiv'>
                <label 
                className='formLabel'
                htmlFor="content">Содержание</label>
                <textarea
                    className="formArea"
                    {...register('content', { required: 'Это поле обязательно' })}
                />
                    {errors.content && <span className='formError'>{(errors.content as FieldError).message}</span>} 
            </div>
            <div className='formDiv'> 
                <label 
                className='formLabel'
                htmlFor="image">Ссылка на иллюстрацию</label>
                <input
                className="formInput"
                {...register('image', { required: 'Это поле обязательно' })}
                />
                    {errors.image && <span className='formError'>{(errors.image as FieldError).message}</span>} 
            </div>
        <button type="submit" className='accept'>Добавить</button>
        </form> 
    )
}