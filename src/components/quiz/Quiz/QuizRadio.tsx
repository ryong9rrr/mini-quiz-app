import React, { useState } from "react";
import { Radio } from "~/components/common";

interface QuizSelectBoxProps {
  correctAnswer: string;
  inCorrectAnswers: string[];
  onSelectAnswer: (selectedAnswer: string) => void;
}

const makeRandom = (answers: string[]) => {
  return [...answers].sort();
};

const QuizSelectBox = ({ correctAnswer, inCorrectAnswers, onSelectAnswer }: QuizSelectBoxProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const answers = makeRandom([...inCorrectAnswers, correctAnswer]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelectAnswer(value);
  };

  return (
    <ul>
      <Radio name="quiz" options={answers} selectedValue={selectedValue} onSelect={handleSelect} />
    </ul>
  );
};

export default QuizSelectBox;
