import React, { useState } from "react";
import { RadioGroup } from "~/components/common";

interface QuizRadioGroupProps {
  correctAnswer: string;
  inCorrectAnswers: string[];
  onSelectAnswer: (selectedAnswer: string) => void;
}

const makeRandom = (answers: string[]) => {
  return [...answers].sort();
};

const QuizRadioGroup = ({
  correctAnswer,
  inCorrectAnswers,
  onSelectAnswer,
}: QuizRadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const answers = makeRandom([...inCorrectAnswers, correctAnswer]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelectAnswer(value);
  };

  return (
    <RadioGroup
      name="quiz"
      options={answers}
      selectedValue={selectedValue}
      onSelect={handleSelect}
    />
  );
};

export default QuizRadioGroup;
