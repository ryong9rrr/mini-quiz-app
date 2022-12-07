import React from "react";

interface RandomQuizListProps {
  correctAnswer: string;
  inCorrectAnswers: string[];
}

const makeRandom = (answers: string[]) => {
  return [...answers].sort();
};

const RandomQuizList = ({ correctAnswer, inCorrectAnswers }: RandomQuizListProps) => {
  const answers = [...inCorrectAnswers, correctAnswer];
  return (
    <ul>
      {makeRandom(answers).map((answer) => (
        <li key={answer}>{answer}</li>
      ))}
    </ul>
  );
};

export default RandomQuizList;
