'use client'
import {signIn, useSession } from "next-auth/react";
import Link from "next/link";
import sickle from "@/img/serp.webp"
import Image from "next/image";
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
            <Link href="/user"
            className="button-sing-in">
                {session?.user?.name}
            </Link>   
            </div>

        </>
        )
    }
        return(
        <button onClick={() => signIn()} className="button-sign-in">
            Войти
        </button>
        )
    }

export default function NavMenu() {
    const [widthwindow,setWidthWindow] = useState<number>(window.innerWidth);
    const [visNav, setVisNav] = useState<boolean>(false);
    useEffect(() =>{
        const handleResize = () => {
            setWidthWindow(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
    },[])

    const handleNav = () => {
        setVisNav(!visNav);
    }

    return (
        <>
        {widthwindow > 1024 ? 
        <div className="static-head">
                <RouterComponent url="/">
                <Image className="sickle-img" src={sickle.src}  alt="Показатели"
                fill={true}/>
                </RouterComponent>

                <nav className="nav">
                <RouterComponent>
                <Link href="/about" 
                className="link">

                О проекте
                </Link>
                </RouterComponent>
                <RouterComponent>
                <Link href="/articles" className="link">
                Статьи
                </Link>
                </RouterComponent>
                <RouterComponent>
                <Link href="/selfEducation" className="link">
                
                Самообразование
                </Link>
                </RouterComponent>
                <AuthButtoh/>   
            </nav>
        </div>
            : 
            <>
            <div className="mini-nav">
            
            <Image className="sickle-img" src={sickle.src}  alt="Показатели"
            fill={true}
            onClick={handleNav}/>    
            </div>
            {visNav &&
                <RouterComponent>
                    <nav className="smallNav">
                        <Link href="/" className="link">
                        На главную
                        </Link>
                        <Link href="/about" className="link">
                        О проекте
                        </Link>
                        <Link href="/articles" className="link">
                        Статьи
                        </Link>
                        <Link href="/selfEducation" className="link">

                        Самообразование
                        </Link>
                        <AuthButtoh/>    
                    </nav>
                </RouterComponent>
            }
            </>
                
        }
        </>
    )
}