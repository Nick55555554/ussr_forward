import HomeClientComponent from "./mainPage/HomeClient";
import { getArticles } from "@/utils";
import { handleRating } from "@/utils";
const HomeServerComponent = async () => {
    const articles = await getArticles();
    const rating = await handleRating();
    return (
        <HomeClientComponent articles={articles.slice(0,6)} rating ={rating.result}/>
    );
};

export default HomeServerComponent;
