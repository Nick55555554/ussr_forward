import { ArticlesProps } from "@/utils";

type Filters = {
    authors: string[];
    themes:string[];
    dateRange: [Date | null, Date | null];
    searchTerm: string;
    rate: number[];
};
interface State{
    articles: ArticlesProps[];
    filters: Filters;
}
export const initialState: State = {
        articles: [],
        filters: {
            authors: [],
            themes: [],
            dateRange: [null, null],
            searchTerm: '',
            rate: [],
        }
};
type Action =
    | { type: 'SET_AUTHORS'; payload: string[] }
    | { type: 'SET_THEMES'; payload: string[] }
    | { type: 'SET_DATE_RANGE'; payload: [Date | null, Date | null] }
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_ARTICLES'; payload: ArticlesProps[] }
    | {type: 'SET_RATING';payload: number[];};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_AUTHORS':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    authors: action.payload,
                },
            };
        case 'SET_THEMES':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    themes: action.payload,
                },
            };
        case 'SET_RATING':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    rate: action.payload,
                },
            };
        case 'SET_DATE_RANGE':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    dateRange: action.payload,
                },
            };
        case 'SET_SEARCH_TERM':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchTerm: action.payload,
                },
            };
        case 'SET_ARTICLES':
            return {
                ...state,
                articles: action.payload,
            };
        default:
            return state;
    }
};
