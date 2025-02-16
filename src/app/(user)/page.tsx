import HomeClientComponent from "./mainPage/HomeClient";
import { getArticles, getPeriods } from "@/utils";
import { handleRating } from "@/utils";
const HomeServerComponent = async () => {
    const articles = await getArticles();
    const periods = await getPeriods();
    return (
        <HomeClientComponent articles={articles.slice(0,6)} periods={periods} />
    );
};

export default HomeServerComponent;
