'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import './styles.scss'
const SignInPage = () => {
    return (
        <div className="auth-page">
        
            <div className="login-window">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Stern_von_Bethlehem_own.png/1200px-Stern_von_Bethlehem_own.png'alt="Graffiti" className="graffiti-image" />
                <h1 className="red">Добро пожаловать</h1>
                <button onClick={() => signIn("github")} className="confirm-button">Войти через GitHub</button>
                <button onClick={() => signIn("google")} className="confirm-button google">Войти через Google</button>
                <h6 className="back-button">Или <Link href="/">вернуться на главную</Link></h6>
                <h6 className="welcome">Чтобы прочитать статью, выполните вход в систему</h6>
            </div>
        </div>
    );
};

export default SignInPage;