"use client"
import { ArticlesProps } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getPinnedArticles } from "./page";
import { AnimatedBox } from "@/app/components/animatedBox/AnimatedBox";
import { Article } from "@/app/components/article/Article";
import './styles.scss'

export default function UserClient(){
    const session = useSession();;
    
    
    const [articlesData, setArticlesData] = useState<ArticlesProps[]>();
    
    useEffect(() => {
        const fetchArticles = async () => {
            if (session?.data?.user?.email) {
                const articles = await getPinnedArticles(session.data.user.email);
                setArticlesData(articles.result);
            }
        };

        fetchArticles();
    },[])

    useEffect(() => {
        console.log(session?.data?.user?.email)
        console.log(articlesData)
    },[articlesData])
    
    
    return(
        <div  className="user-page">
            <h2 className="pin-label">Закрепленные статьи</h2>
            <div className="flex-articles">
            
                {articlesData ? articlesData.map(article => (
                    <AnimatedBox 
                    tall={true}
                    key={article.id}>
                        <Article 
                        id={article.id} content={article.content} author={article.author}
                        title={article.title}
                        image={article?.image}
                        theme={article?.theme} />
                        </AnimatedBox>
                    ))
                :
                <h1 className="bold-label">Упс.. Ничего не найдено</h1>}
                </div>
        </div>
    )
}