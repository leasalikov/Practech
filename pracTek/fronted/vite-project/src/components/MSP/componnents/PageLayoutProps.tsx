import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../../style/Costumer.css";
import SearchBox from "./SearchBox";

interface PageLayoutProps {
    title?: string; 
    showSearch?: boolean; 
    searchPlaceholder?: string;
    addButtonLabel: string;
    goBackButtonLabel?: string;
    nextButtonLabel?: string;
    onGoBackClick?: () => void;
    onNextClick?: () => void; 
    onAddClick: () => void;
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
    title,
    showSearch = false, // ברירת מחדל: לא להציג חיפוש
    searchPlaceholder = "Search...",
    addButtonLabel,
    onAddClick,
    children
}) => {
    return (
        <div className="setup-success">
            <div className="card-header">
                {showSearch ? (
                    // <InputText placeholder={searchPlaceholder} className="search-box" />
                    <SearchBox placeholder="Search..." />
                ) : (
                    <span className="card-title">{title}</span> // הצגת כותרת אם אין חיפוש
                )}
                <Button label={addButtonLabel} className="custom-button" onClick={onAddClick} />
            </div>

            {children}
        </div>
    );
};

export default PageLayout;
