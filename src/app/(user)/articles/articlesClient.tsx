"use client"
import { AnimatedBox } from "@/app/UI/animatedBox/AnimatedBox";
import { Article } from "@/app/UI/article/Article";
import Input from "@/app/UI/input/Input";
import { ArticlesProps, RatingProps } from "@/utils";
import "./styles.scss"
import { useAtom } from "jotai";
import { searchTextAtom } from "@/utils";
import { useEffect, useRef, useState,useReducer} from "react";
import { reducer, initialState } from "./FilterReducer";

export function ArticlesClientComponent({
    articles, rating
}:{
    articles:ArticlesProps[], rating: RatingProps[]
}){
    const [filtred, setFilter] = useState<ArticlesProps[]>([]);
    const [searchText] = useAtom(searchTextAtom);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [authors, setAuthors] = useState<string[]>([]);
    const [themes, setThemes] = useState<string[]>([]);    
    const [state, dispatch] = useReducer(reducer, initialState);
    const filtersRef = useRef<HTMLDivElement | null>(null);
    const layoutRef = useRef<HTMLDivElement | null>(null);
    const [selecteDateInterval, setSelecteDateInterval] = useState<string>("allTime");
    const [rateCount, setRateCount] = useState<number[]>([0,0,0,0,0]);
    const [articlesCount, setArticlesCount] = useState<number>(0);
    const newMidRating = Array.from({ length: 10 }, () => []);
    const [midRating, setMidRating] = useState<number[][]>(newMidRating);

    useEffect(() => {
        if (articles){
            const uniqueAuthors = Array.from(new Set(articles.map(one => one.author)))
            setAuthors(uniqueAuthors)
            const uniqueThemes = Array.from(new Set(articles.map(one => one.theme)))
            setThemes(uniqueThemes)
            let maxId = 0;
            articles.forEach(article => {
                if(article.id > maxId) maxId = article.id
            });
            setArticlesCount(maxId)
        }
    },[articles])








    //Фильтры

    const onClickFilters = () => {
        if(filtersRef.current && layoutRef.current){
            filtersRef.current.style.display = "grid"
            layoutRef.current.style.display = "block"
        }
    }
    const onLayoutClick = () => {
        if(filtersRef.current && layoutRef.current){
            filtersRef.current.style.display = "none"
            layoutRef.current.style.display = "none"
        }
    }

    const handleFocusChange = (isFocused: boolean) => {
        setIsInputFocused(isFocused); 
    };


    useEffect(()=>{
        
        if(searchText){
            const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(searchText.toLowerCase()))
            setFilter(filteredArticles)
        }else{
            setFilter(articles)
        }
    },[searchText,articles,])
    

    const handleAuthorChange = (author: string) => {
        const newAuthors =  state.filters.authors.includes(author)
            ? state.filters.authors.filter(a => a !== author)
            : [...state.filters.authors, author];

            dispatch({ type: 'SET_AUTHORS', payload:  newAuthors });
    };

    const handleThemeChange = (theme: string) => {
        const newThemes = state.filters.themes.includes(theme)
            ? state.filters.themes.filter(t => t !== theme)
            : [...state.filters.themes, theme];

            dispatch({ type: 'SET_THEMES', payload: newThemes });
    };

    const handleRatingChange = (rate: number) => {
        const newRates = state.filters.rating.includes(rate)
            ? state.filters.rating.filter(r => r !== rate)
            : [...state.filters.rating, rate];

            dispatch({ type: 'SET_RATING', payload: newRates});
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelecteDateInterval(event.target.value);
    };
    const confirmFiltersHandler = () => {
        let newFiltredArticles = articles.filter(one => 
            state.filters.authors.some(author => one.author === (author)) 
            && state.filters.themes.some(theme => one.theme === (theme)))

            
            if (state.filters.themes.length === 0 && state.filters.authors.length !== 0){
                newFiltredArticles = articles.filter(one => 
                    state.filters.authors.some(a => one.author === (a)))
                    
                }else if (state.filters.authors.length === 0 && state.filters.themes.length !== 0){
                    
                    newFiltredArticles = articles.filter(one => 
                        state.filters.themes.some(t => one.theme === (t)))
                    } else if (state.filters.authors.length === 0 && state.filters.themes.length === 0){
                        newFiltredArticles = articles
                    }
            if (selecteDateInterval === 'week') {
                const oneWeekAgo = Date.now() - 604800000;
                newFiltredArticles.forEach(o => {
                    console.log(o?.date)
                }); 
                console.log(newFiltredArticles)
                newFiltredArticles = newFiltredArticles.filter(one => 
                    one.date !== undefined && new Date(one.date).getTime() >= oneWeekAgo 
                );
            } else if(selecteDateInterval === 'month'){
                console.log('month')
                const oneMonthAgo = Date.now() - 2678400000;
                newFiltredArticles = newFiltredArticles.filter(one => 
                    one.date !== undefined && new Date(one.date).getTime() >= oneMonthAgo 
                );
            } else if(selecteDateInterval === 'year'){
                console.log('year')
                const oneYearAgo = Date.now() - 31536000000;
                newFiltredArticles = newFiltredArticles.filter(one => 
                    one.date !== undefined && new Date(one.date).getTime()  >= oneYearAgo 
                );
            }
        console.log(newFiltredArticles)
        setFilter(newFiltredArticles)
        
        if (filtersRef.current && layoutRef.current) {
            filtersRef.current.style.display = "none";
            layoutRef.current.style.display = "none";
        }
    };
    


    useEffect(() => {
        if(articles){
            articles.forEach(article => {
                if(article.created_at){
                    const date = new Date(article.created_at);
                    const millisecondsSinceEpoch = date.getTime()
                    article.date = millisecondsSinceEpoch
                    console.log(millisecondsSinceEpoch)
                }
            });
        }
    },[articles])


    useEffect(() => {
        if (midRating.length >= articlesCount) {
            const newMidRating = [...midRating]; 
    
            rating.forEach((one) => {
                if (one.article_id < newMidRating.length) {
                    newMidRating[one.article_id].push(one.degree);
                }
            });
    
            setMidRating(newMidRating);
        }
    }, [rating]);

    useEffect(() => {
        const sumRate = rateCount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (!sumRate) {
            const newRateCount = [...rateCount]; 
    
            midRating.forEach((one) => {

                if (one.length > 0) { 
                    const summa = one.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    if (summa) {
                        const index = Math.round(summa / one.length);
                        if (index > 0 && index <= newRateCount.length) { 
                            newRateCount[index - 1] += 1; 
                        }
                    }
                }
            });
    
            setRateCount(newRateCount); 
        }
    }, [midRating]);
    


    return(
        <div className="articles-page">
            
            <div className="article-face">
            <h1 className={`bold-label  ${isInputFocused ? "small" : "inline"}`}>
                    Статьи
                </h1>
                    <Input onClickFilters={onClickFilters} onFocusChange={handleFocusChange}/>
                
            </div>
            <div className="layout"
            ref={layoutRef}
            onClick={onLayoutClick}
            ></div>
            <div className = "filters"
            ref={filtersRef}>
                <div className="filters-date">
                <h5 className="filter-head">По времени публикации</h5>
                    <ul className="filters-date-variants">
                        <li className="filters-date-li">
                            <input id="week"  value="week" type="radio" name="options"
                            checked={selecteDateInterval === 'week'}
                            onChange={handleDateChange}
                            />
                            <span className="radio-btn"></span>
                            <label  htmlFor="week"
                            className="cursor-pointer">За последнюю неделю</label>
                        </li>
                        <li className="filters-date-li">
                            <input type="radio" value="month" id="month" name="options" 
                            checked={selecteDateInterval === 'month'}
                            onChange={handleDateChange}
                            />
                            <span className="radio-btn"></span>
                            <label htmlFor="month" className="cursor-pointer">За последний месяц</label>
                        </li>
                        
                        <li className="filters-date-li">
                            <input type="radio" value="year" id="year" name="options"
                            checked={selecteDateInterval === 'year'}
                            onChange={handleDateChange}
                            />
                            <span className="radio-btn"></span>
                            <label htmlFor="year" className="cursor-pointer">За последний год</label>
                        </li>
                        <li className="filters-date-li">
                            <input type="radio" value="allTime" id="allTime" name="options"
                            checked={selecteDateInterval === 'allTime'}
                            onChange={handleDateChange}
                            />
                            <span className="radio-btn"></span>
                            <label htmlFor="allTime" className="cursor-pointer">За всё время</label>
                        </li>
                    </ul>
                </div>
                <div className="filters-theme">
                    <ul className="filters-variants">
                        <h5 className="filter-head">Темы</h5>
                        <fieldset>
                        {themes?.map((one,index) => (
                                <li className="filters-theme-li" key={index}>
                                    <input  id={one} type="checkbox" 
                                    checked={state.filters.themes.includes(one)} 
                                    onChange={() => handleThemeChange(one)}
                                    />
                                    <span className="checked-btn" ></span>
                                    <label htmlFor={one}
                                    className="cursor-pointer"
                                    >{one}</label>
                                </li>
                                ))
                            }
                        </fieldset>
                    </ul>
                </div>
                <div className="filters-calendar">
                    <div className="filters-rating"> 
                        <h5 className="filter-head">Оценки</h5>
                        <fieldset>
                        {[1,2,3,4,5]?.map((one) => (
                                <li className="filters-rating-li" key={one}>
                                    <input  id={one.toString()} type="checkbox" 
                                    checked={state.filters.rating.includes(one)} 
                                    onChange={() => handleRatingChange(one)}
                                    />
                                    <span className="checked-btn" ></span>
                                    <label htmlFor={one.toString()} 
                                    className="w-1/9 cursor-pointer">{one}</label>
                                    <div className="ml-1 text-base leading-loose  ">  ({rateCount[one - 1] ? rateCount[one - 1] : 0})</div>
                                </li>
                                ))
                            }
                        </fieldset>
                    </div>
                </div>
                <div className="filters-author-confirm">
                    <div className="filters-author">
                        <ul className="filters-variants">
                            <h5 className="filter-head">Авторы</h5>
                            <fieldset>
                            {authors?.map((one,index) => (
                                <li className="filters-author-li" key={index}>
                                    <input  id={one} type="checkbox" 
                                    checked={state.filters.authors.includes(one)} 
                                    onChange={() => handleAuthorChange(one)}/>
                                    <span className="checked-btn"></span>
                                    <label htmlFor={one}
                                    className="cursor-pointer"
                                    >{one}</label>
                                </li>
                                ))
                            }
                            </fieldset>
                        </ul>
                    </div>
                    <button className="filters-confirm" 
                    onClick={confirmFiltersHandler}
                    >Подтвердить</button>
                    </div> 
            </div>
            <div className={`${isInputFocused ? "flex-articles small-flex" : "flex-articles"}`}>
                {filtred ? filtred.map(article => (
                    <AnimatedBox 
                    tall={true}
                    key={article.id}>
                        <Article 
                        id={article.id} content={article.content} author={article.author}
                        title={article.title}
                        image={article?.image}
                        theme={article?.theme} 
                        />
                        </AnimatedBox>
                    ))
                :
                <h1 className="bold-label">Упс.. Ничего не найдено</h1>}
                </div>
        </div>
    )
}