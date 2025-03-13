'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import './styles.scss'
import Image from "next/image";
const SignInPage = () => {
    return (
        <div className="auth-page">
        
            <div className="login-window">
                <Image
                 fill={true}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Stern_von_Bethlehem_own.png/1200px-Stern_von_Bethlehem_own.png'alt="Graffiti" className="graffiti-image" />
                <h1 className="red">Добро пожаловать</h1>
                <button onClick={() => signIn("google")} className="confirm-button google">Войти через Google</button>
                <h5 className="back-button">Или <Link href="/">вернуться на главную</Link></h5>
                <h5 className="welcome">Чтобы прочитать статью, выполните вход в систему</h5>
            </div>
        </div>
    );
};

export default SignInPage;