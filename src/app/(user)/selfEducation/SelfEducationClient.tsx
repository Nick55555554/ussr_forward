'use client'
import './styles.scss'
import { periodsAtom, PeriodsProps } from '@/utils';
import { Period } from '@/app/UI/period/Period';
import {useAtom } from 'jotai';
import { useEffect } from 'react';


export default function SelfEducationClinet ({
    periods
}:{
    periods: PeriodsProps[]
}) {
    const [periodsA, setPeriodsA] = useAtom(periodsAtom);

    useEffect(() =>{
        setPeriodsA(periods)
        console.log(periods)
    }
        ,[periodsA])


    return (
        <div className="education-page flex justify-center flex-col">
            <h1 className='bold-labelEdu'>Темы</h1>
            <div className='periods'>
                {periods.length > 0 && periods.map((period) => (
                    <div key={period.id} className='period-div'>
                        <Period id={period.id} name={period.name} start_date={period.start_date} end_date={period.end_date} title_image={period.title_image} />
                    </div>
                ))}
            </div>
        </div>
    );
};


