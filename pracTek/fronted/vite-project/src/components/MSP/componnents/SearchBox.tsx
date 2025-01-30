import React from "react";
import { InputText } from "primereact/inputtext";
import "../../style/SearchBox.css"; // עיצוב מותאם

interface SearchBoxProps {
    placeholder?: string;
    size?: "small" | "medium" | "large"; // פרופרטי חדש לגודל
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search...", size = "medium" }) => {
    return (
        <div className={`search-box-container ${size}`}>  {/* הוספת המחלקה size */}
            <span className="search-icon">
                <i className="pi pi-search"></i> {/* אייקון זכוכית מגדלת */}
            </span>
            <InputText placeholder={placeholder} className="search-box" />
        </div>
    );
};

export default SearchBox;
