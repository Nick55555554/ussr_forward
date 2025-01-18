"use client"
import { useRef } from "react"
import "../styles.scss"
import { useRouter } from "next/navigation"

export default function AuthorLoginClient() {
    const router = useRouter();

    const loginRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const login = loginRef.current?.value; 
        const password = passwordRef.current?.value; 

        console.log("Логин:", login);
        console.log("Пароль:", password);
    }
    const handleForgotPassword = () => {
        router.push("/register")
    }
    const handleNoAccount = () => {
        router.push("/register")
    }

    return(
        <div className="author-page">
            <div className="login-window">
                <h2>Добро пожаловать</h2>
                <form onSubmit={handleSubmit} className="form" >
                    <div>
                        <input 
                        className="login-text"
                        placeholder="Введите логин" ref={loginRef}
                        required/>
                    </div>
                    <div>
                        <input
                        className="login-text"
                        placeholder="Введите пароль" ref={passwordRef}/>
                    </div>
                <button className="confirm-button" type="submit">Войти</button>
                </form>
                <div className="allproblems">
                    <button className="anyproblems"
                    onClick={handleForgotPassword}
                    >Забыли пароль?</button>
                    <button className="anyproblems"
                    onClick={handleNoAccount}
                    >Нет аккаунта?</button>
                </div>
            </div>
        </div>
    )
}