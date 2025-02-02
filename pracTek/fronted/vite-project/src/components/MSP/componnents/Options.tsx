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
