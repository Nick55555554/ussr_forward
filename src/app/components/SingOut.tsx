'use client'
import { signOut } from "next-auth/react";
export const SingOut= () => {
    return(
        <button 
            onClick={() => signOut()} className="button-sign-out">
            Выйти
        </button> 
    )
}