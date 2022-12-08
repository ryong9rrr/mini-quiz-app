import React from "react";
import { Text } from "~/components/atom";
import { IQuiz } from "~/lib/models";
import QuizRadioGroup from "./QuizRadioGroup";

interface QuestionProps {
  quizNumber: number;
  currentQuiz: IQuiz;
  onSelectAnswer: (selectedAnswer: string) => void;
}

const Question = ({ quizNumber, currentQuiz, onSelectAnswer }: QuestionProps) => {
  return (
    <>
      <Text bold size="xlg">
        {quizNumber}번 문제
      </Text>
      <Text size="lg">{currentQuiz.question}</Text>
      <QuizRadioGroup
        correctAnswer={currentQuiz.correct_answer}
        inCorrectAnswers={currentQuiz.incorrect_answers}
        onSelectAnswer={onSelectAnswer}
      />
    </>
  );
};

export default Question;
