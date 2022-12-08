import React, { ChangeEvent } from "react";

interface RadioGroupProps {
  name: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const RadioGroup = ({ name, options, selectedValue, onSelect }: RadioGroupProps) => {
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.value);
  };

  return (
    <ul>
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
    </ul>
  );
};

export default RadioGroup;
