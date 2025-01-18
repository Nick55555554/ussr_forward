import { useCallback, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import "./styles.scss";
import { useAtom } from "jotai";
import { searchTextAtom } from "@/utils";

interface InputProps {
    onClickFilters: () => void;
    onFocusChange: (isFocused: boolean) => void; 
}

const Input: React.FC<InputProps> = ({ onClickFilters, onFocusChange }) => {
    const [searchText, setSearchText] = useAtom<string>(searchTextAtom);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false); 

    const handleFocus = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className={`input ${isFocused ? 'focused' : ''}`}>
            <CiSearch onClick={handleFocus} size={36} />
            <input 
                className="search" 
                ref={inputRef}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => {
                    setIsFocused(true);
                    onFocusChange(true);
                }} 
                onBlur={() => {
                    setIsFocused(false);
                    onFocusChange(false); 
                }}
            />
            <button className="input-button" onClick={onClickFilters}>
                <IoFilterSharp size={40} />
            </button>
        </div>
    );
};

export default Input;
