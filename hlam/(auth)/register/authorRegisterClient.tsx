"use client"
import { useActionState, useRef } from "react"
import "../styles.scss"
import { signup } from '@/app/(auth)/actions'
export default function AuthorRegisterClient() {
    const loginRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const [state, action, pending] = useActionState(signup, undefined)


    return(
        <div className="author-page">
            <div className="login-window">
                <h2>Добро пожаловать</h2>
                <form action={action} className="form" >
                    <div>
                        <input 
                        name="name"
                        className="login-text"
                        placeholder="Введите ваше имя" ref={loginRef}
                        required/>
                        {state?.errors?.name && <p>{state.errors.name}</p>}
                    </div>

                    <div>
                        <input 
                        name="email"
                        className="login-text"
                        placeholder="Введите электронную почту" ref={loginRef}
                        required/>
                        {state?.errors?.email && <p>{state.errors.email}</p>}
                    </div>

                    <div>
                        <input
                        name="password"
                        type="password"
                        className="login-text"
                        placeholder="Введите пароль" ref={passwordRef}/>
                        {state?.errors?.password && (
                            <div>
                            <p>Password must:</p>
                            <ul>
                                {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                                ))}
                            </ul>
                            </div>
                        )}
                    </div>

                    <button disabled={pending} type="submit" className="confirm-button"
                    >Войти</button>
                    
                </form>
            </div>
        </div>
    )
}