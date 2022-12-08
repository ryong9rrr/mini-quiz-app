import React, { ChangeEvent } from "react";
import styled from "styled-components";

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
    <Container>
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
    </Container>
  );
};

export default RadioGroup;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;

  input,
  label {
    cursor: pointer;
  }
`;
