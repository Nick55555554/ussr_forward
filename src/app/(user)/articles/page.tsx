import { ArticlesClientComponent } from "./articlesClient"
import { getArticles } from "@/utils"
import { handleRating } from "@/utils";




const ArticlesServerComponent = async () => {
    const articles = await getArticles();
    const rating = await handleRating();
    return(
        <ArticlesClientComponent articles = {articles} rating={rating.result}/>
    )
}
export default ArticlesServerComponent