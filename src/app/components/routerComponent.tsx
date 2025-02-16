'use client'
import { useRouter } from "next/navigation"
import { ReactNode } from 'react';

interface RouterCompProps {
    children: ReactNode,
    url?: string,
}
export const RouterComponent:React.FC<RouterCompProps> = ({children, url}) =>{
    const router = useRouter();
    return(
        <>
            {url ?
                <div onClick={() => router.push(url)}>
                {children}
            </div> 
            :
            <div>
                {children}
            </div>
            }
        </>
    )
}