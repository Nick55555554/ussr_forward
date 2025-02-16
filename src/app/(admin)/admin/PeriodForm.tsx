'use client'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import {submitPeriod } from './sumbit_Utils';
import { PeriodsProps } from '@/utils';


export const PeriodForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<PeriodsProps>();

    const onSubmit: SubmitHandler<PeriodsProps> = async (data:PeriodsProps) => {
        try {
            console.log(data)
            const result = await submitPeriod(data); 
            console.log('Успешно отправлено:', result);
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        }
    }
    
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='formDiv'>
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
                htmlFor="start_date">Начало</label>
                <input
                    className="formInput"
                    {...register('start_date', { required: 'Это поле обязательно' })}
                />
                    {errors.start_date && <span className='formError'>{(errors.start_date as FieldError).message}</span>} 
            </div>
            <div className='formDiv'>
                <label 
                className='formLabel'
                htmlFor="end_date">Конец</label>
                <input
                className="formInput"
                {...register('end_date', { required: 'Это поле обязательно' })}
                />
                    {errors.end_date && <span className='formError'>{(errors.end_date as FieldError).message}</span>} 
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
        </form> 
    )
}