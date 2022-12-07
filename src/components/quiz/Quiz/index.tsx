import React, { useEffect, useState } from "react";
import { IQuiz } from "~/lib/models";
import QuizManager from "~/modules/quizManager";
import QuizFeedback from "./QuizFeedback";
import QuizRadioGroup from "./QuizRadioGroup";

interface QuizProps {
  quizNumber: number;
  isLast: boolean;
  currentQuiz: IQuiz;
  onClickNextQuiz: (isSelected: boolean, isCorrect: boolean) => void;
}

const Quiz = ({ quizNumber, isLast, currentQuiz, onClickNextQuiz }: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const isCorrect = QuizManager.isCorrect(currentQuiz, selectedAnswer);
  const isSelected = !!selectedAnswer;
  const nextButtonDisabled = !selectedAnswer;

  const handleSelectRadio = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleClickNextQuiz = () => {
    onClickNextQuiz(isSelected, isCorrect);
  };

  useEffect(() => {
    setSelectedAnswer("");
  }, [quizNumber]);

  return (
    <>
      <QuizFeedback isSelected={isSelected} isCorrect={isCorrect} />
      <h1>{quizNumber} 번 문제</h1>
      <h2>{currentQuiz.question}</h2>
      <QuizRadioGroup
        correctAnswer={currentQuiz.correct_answer}
        inCorrectAnswers={currentQuiz.incorrect_answers}
        onSelectAnswer={handleSelectRadio}
      />
      {isSelected && (
        <button type="button" onClick={handleClickNextQuiz} disabled={nextButtonDisabled}>
          {isLast ? "결과 보기" : "다음 문제"}
        </button>
      )}
    </>
  );
};

export default Quiz;
