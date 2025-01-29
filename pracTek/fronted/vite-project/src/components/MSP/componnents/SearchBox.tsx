import React from "react";
import { InputText } from "primereact/inputtext";
import "../../style/SearchBox.css"; // עיצוב מותאם

interface SearchBoxProps {
    placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search..." }) => {
    return (
        <div className="search-box-container">
            <span className="search-icon">
                <i className="pi pi-search"></i> {/* אייקון זכוכית מגדלת */}
            </span>
            <InputText placeholder={placeholder} className="search-box" />
        </div>
    );
};

export default SearchBox;
