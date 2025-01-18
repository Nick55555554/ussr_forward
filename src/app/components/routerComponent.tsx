'use client'
import { useRouter } from "next/navigation"
import { ReactNode } from 'react';

interface RouterCompProps {
    children: ReactNode,
    url: string,
}
export const RouterComponent:React.FC<RouterCompProps> = ({children, url}) =>{
    const router = useRouter();
    return(
        <div onClick={() => router.push(url)}>
            {children}
        </div>
    )
}