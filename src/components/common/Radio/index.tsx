import React, { ChangeEvent } from "react";

interface RadioProps {
  name: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const Radio = ({ name, options, selectedValue, onSelect }: RadioProps) => {
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.value);
  };

  return (
    <div>
      {options.map((option) => (
        <li key={option}>
          <input
            name={name}
            type="radio"
            id={option}
            value={option}
            checked={selectedValue === option}
            onChange={handleSelect}
          />
          <label htmlFor={option}>{option}</label>
        </li>
      ))}
    </div>
  );
};

export default Radio;
