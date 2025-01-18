import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ArticleClient from "./ArticleClient";


export default async function ArticlePage() {
    const session = await getServerSession();
    if(!session || !session.user){
        redirect("/api/auth/signin");
    } 
    return(
        <ArticleClient/>
    )
}