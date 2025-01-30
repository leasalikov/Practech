import React from "react";
import { Button } from "primereact/button";
import "../../style/Costumer.css";
import SearchBox from "./SearchBox";
import AssessmentOptions from "./Options"; // הייבוא של AssessmentOptions

interface PageLayoutProps {
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  addButtonLabel: string;
  nextButtonLabel?: string;
  goBackButtonLabel?: string;
  onGoBackClick?: () => void;
  onNextClick?: () => void;
  onAddClick: () => void;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  showSearch = false,
  searchPlaceholder = "Search...",
  addButtonLabel,
  onAddClick,
  children,
}) => {

    
  return (
    <div className="setup-success">
      <div className="card-header">
        <div className="header-content">
          {showSearch ? (
            // הצגת תיבת חיפוש אם showSearch הוא true
            <SearchBox size="small" placeholder={searchPlaceholder} />
          ) : (
            // הצגת כפתורים פשוטים אם showSearch הוא false
            <AssessmentOptions onSelect={(option) => console.log(option)} />
          )}
          <Button label={addButtonLabel} className="custom-button" onClick={onAddClick} />
        </div>
      </div>

      {children}
    </div>
  );
};

export default PageLayout;
