// import React from "react";
// import { Button } from "primereact/button";
// import "../../style/Costumer.css";
// import SearchBox from "./SearchBox";
// import AssessmentOptions from "./Options"; // הייבוא של AssessmentOptions
// import PageLayoutProps from '../../style/PageLayoutProps.css'

// interface PageLayoutProps {
//   title?: string;
//   showSearch?: boolean;
//   searchPlaceholder?: string;
//   addButtonLabel: string;
//   nextButtonLabel?: string;
//   goBackButtonLabel?: string;
//   onGoBackClick?: () => void;
//   onNextClick?: () => void;
//   onAddClick: () => void;
//   children: React.ReactNode;
// }

// const PageLayout: React.FC<PageLayoutProps> = ({
//   title,
//   showSearch = false,
//   searchPlaceholder = "Search...",
//   addButtonLabel,
//   onAddClick,
//   children,
// }) => {

    
//   return (
//     <div className="setup-success">
//       <div className="card-header">
//         <div className="header-content">
//           {showSearch ? (
//             // הצגת תיבת חיפוש אם showSearch הוא true
//             <SearchBox size="small" placeholder={searchPlaceholder} />
//           ) : (
//             // הצגת כפתורים פשוטים אם showSearch הוא false
//             <AssessmentOptions onSelect={(option) => console.log(option)} />
//           )}
//           <Button label={addButtonLabel} className="custom-button" onClick={onAddClick} />
//         </div>
//       </div>

//       {children}
//     </div>
//   );
// };

// export default PageLayout;


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
  onGoBackClick?: () => void;
  useOptions?: boolean; // משתנה חדש שיאפשר לבחור אם להציג אפשרויות
  options?: { label: string; value: string }[]; // מערך אופציות דינמי
  onAddClick: () => void;
  onNextClick?: () => void;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  showSearch = false,
  searchPlaceholder = "Search...",
  addButtonLabel,
  useOptions = false, // ברירת מחדל - לא להציג אופציות אלא חיפוש
  options = [], // ברירת מחדל - אין אופציות
  onAddClick,
  children,
}) => {
  const handleOptionSelect = (option: string) => {
    console.log(`Option selected: ${option}`);
  };

  return (
    <div className="setup-success">
      <div className="card-header">
        <div className="header-content">
          {showSearch ? (
            <SearchBox size="small" placeholder={searchPlaceholder} />
          ) : useOptions ? (
            <AssessmentOptions options={options} onSelect={handleOptionSelect} />
          ) : (
            <span className="card-title">{title}</span>
          )}
          <Button label={addButtonLabel} className="custom-button" onClick={onAddClick} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
