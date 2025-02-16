"use client"
import { ArticlesProps } from "@/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getPinnedArticles } from "./page";
import { AnimatedBox } from "@/app/UI/animatedBox/AnimatedBox";
import { Article } from "@/app/UI/article/Article";
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

    
    
    return(
        <div  className="user-page">
            <div className="flex justify-between items-center mt-12 pl-12 pr-12">
                <h2 className="pin-label inline">Закрепленные статьи</h2>
                <div className="exit">
                
                </div>
            </div>

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