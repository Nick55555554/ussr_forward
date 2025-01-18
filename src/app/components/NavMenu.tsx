'use client'
import { signOut,signIn, useSession } from "next-auth/react";
import Link from "next/link";
import sickle from "@/img/serp.png"
import { RouterComponent } from "./routerComponent";
import { useEffect, useRef, useState } from "react";

function AuthButtoh(){
    const {data: session} = useSession();
    const [width, setWidth] = useState<string>('auto');
    const userRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (userRef.current) {
            const currentWidth = userRef.current.offsetWidth;
            setWidth(`${currentWidth + 30}px`);
        }
    }, []);

    if (session){
        return(
        <>

            <div className="user" 
            ref={userRef}
            style={{ width: width }}
            >
            <Link href="/user">
                {session?.user?.name}
            </Link>   
            </div>

            <button 
            onClick={() => signOut()} className="button-sign">
            Выйти
            </button>

        </>
        )
    }
        return(
        <button onClick={() => signIn()} className="button-sign">
            Войти
        </button>
        )
    }

export default function NavMenu() {
    return (
        <div className="static-head">
                <RouterComponent url="/">
                <img className="sickle-img" src={sickle.src}  alt="Показатели"/>
                </RouterComponent>
                <nav className="nav">
                <Link href="/about" className="link">
                Цель проекта
                </Link>
                <Link href="/articles" className="link">
                Статьи
                </Link>
                <Link href="/selfEducation" className="link">
                Самообразование
                </Link>
                <AuthButtoh/>
            </nav>
        </div>
    )
}