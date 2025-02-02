// import React from "react";
// import { Button } from "primereact/button";
// import "../../style/Options.css";

// interface AssessmentOption {
//   label: string;
//   onClick: () => void;
// }

// interface AssessmentOptionsProps {
//   onSelect: (option: string) => void;

// }

// const AssessmentOptions: React.FC<AssessmentOptionsProps> = ({ onSelect }) => {
//   const options: AssessmentOption[] = [
//     // { label: "Security", onClick: () => onSelect("Security") },
//     // { label: "Data Protection", onClick: () => onSelect("Data Protection") },
//     // { label: "Uploads", onClick: () => onSelect("Uploads") },
//   ];

//   return (
//     <div className="assessment-options-container">
//       {options.map((option, index) => (
//         <Button
//           key={index}
//           label={option.label}
//           className="assessment-button"
//           onClick={option.onClick}
//         />
//       ))}
//     </div>
//   );
// };

// export default AssessmentOptions;


import React from "react";
import { Button } from "primereact/button";
import "../../style/Options.css";

interface AssessmentOption {
  label: string;
  value: string;
}

interface AssessmentOptionsProps {
  options: AssessmentOption[]; // מערך האפשרויות יעבור מבחוץ
  onSelect: (option: string) => void;
}

const AssessmentOptions: React.FC<AssessmentOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="assessment-options-container">
      {options.map((option, index) => (
        <Button
          key={index}
          label={option.label}
          className="assessment-button"
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  );
};

export default AssessmentOptions;
