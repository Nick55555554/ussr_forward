import {ReactNode, useEffect, useReducer, useRef } from "react";
import "./styles.scss"

interface State {
    isVisible: boolean;
}
type Action = 
    | { type: 'SET_VISIBLE' };

const initialState = {
        isVisible: false,
    };

const reducer = (state: State, action: Action) => {
    switch(action.type){
        case "SET_VISIBLE":
            return {...state, isVisible: true};
        default:
            return state;
    }
}
interface AnimatedBoxProps{
    children: ReactNode;
    big?: boolean;
    tall?: boolean
}

export const AnimatedBox: React.FC<AnimatedBoxProps> = ({children, big, tall}) => {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dispatch({ type: 'SET_VISIBLE' });
                    observer.unobserve(boxRef.current!); 
                }
            });
        });

        if (boxRef.current) {
            observer.observe(boxRef.current);
        }

        return () => {
            if (boxRef.current) {
                observer.unobserve(boxRef.current)
            }
        };
    }, []);

    return (
        <div className={
            `${state.isVisible ? 'visible' : '' }
            ${big && !tall ? "bigBox" :""}
            ${tall && !big ? "tallBox" :""}
            ${!big && !tall ? "box" : ''}`}
            ref={boxRef}>
            {children}
        </div>
    );
};