"use client"
import { AnimatedBox } from "@/app/UI/animatedBox/AnimatedBox";
import books from "@/img/books.webp"
import films from "@/img/films.jpg"
import omg_people from "@/img/omg_people.jpg"
import articles from "@/img/articles.jpg"
import Image from "next/image";
import './styles.scss'
import { useParams,usePathname,useRouter } from "next/navigation";
import { periodsAtom } from "@/utils";
import { useAtom } from "jotai";
import { PeriodsProps } from "@/utils";
import { RouterComponent } from "@/app/components/routerComponent";
import { useEffect } from "react";


export default function PeriodClient() {
    const {id} = useParams()
    const router = useRouter();
    const pathname = usePathname();
    const [periodsA] = useAtom<PeriodsProps[]>(periodsAtom);

    

    const handleOnSection = (section: string) => {
        if(router && id){
            router.push(`${pathname}/${section}`)
        } else{
            console.error('Router is not available');
        }
    }
    useEffect(()=> console.log(periodsA) ,[periodsA])
    const articlesHandler = () => {
        const ourPeriod:PeriodsProps[] = periodsA.filter(one => one.id === Number(id))
        console.log(ourPeriod)
        if(router && ourPeriod){
            const periodName = ourPeriod[0]?.name;
            router.replace(`/articles?theme=${encodeURIComponent(periodName)}`)
        } else{
            console.error('Router is not available');
        }
    }
    return(
        <div className="period_Page">
            <RouterComponent>
            <div className="sectors">
                <AnimatedBox 
                className="flex justify-center 
                text-center items-center 
                relative rounded-2xl cursor-pointer animate_l"
                >
                    <Image src={books}
                    className="
                    rounded-2xl
                    "   
                    height={330}
                    alt="Title Image"
                    />
                    <div className="overlay"
                    onClick={() => handleOnSection('books/')}
                    ></div>
                    <h1 
                    onClick={() => handleOnSection('books/')}
                    className="h_period_sector ">Книги</h1>
                </AnimatedBox>
                <AnimatedBox className="flex justify-center 
                    text-center items-center
                    animate_l
                    relative rounded-xl cursor-pointer">
                    <Image src={films}
                    className="
                    rounded-xl
                    "      
                    height={330}
                    alt="Title Image"
                    />
                    <div className="overlay"
                    onClick={() => handleOnSection('films/')}
                    ></div>
                    <h1 className="h_period_sector"
                    onClick={() => handleOnSection('films/')}
                    >Фильмы</h1>
                </AnimatedBox>

                <AnimatedBox className="flex justify-center 
                text-center items-center
                animate_l
                relative rounded-2xl cursor-pointer"
                >
                    <Image src={articles}
                    className="
                    rounded-2xl
                    "
                    height={330}
                    alt="Title Image"
                    />
                    <div className="overlay"
                    onClick={articlesHandler}
                    ></div>
                    <h1 
                    className="h_period_sector"
                    onClick={articlesHandler}
                    >
                        Статьи
                    </h1>
                </AnimatedBox>
                <AnimatedBox 
                className="flex justify-center 
                text-center items-center 
                animate_r
                relative rounded-xl cursor-pointer
                
                ">
                    <Image src={omg_people}
                    className="
                    rounded-xl
                    "
                    
                    height={330}
                    alt="Title Image"
                    />
                    
                    <div className="overlay"
                    onClick={() =>
                    handleOnSection('/personalities')}
                    ></div>
                    <h1 className="h_period_sector"
                    onClick={() =>
                        handleOnSection('/personalities')}
                    >
                        Выдающиеся личности
                    </h1>
                </AnimatedBox>
                
            </div>
            </RouterComponent>
        </div>
        
    )
}