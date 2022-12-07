import React, { useEffect, useState } from "react";
import { IQuiz } from "~/lib/models";
import QuizManager from "~/modules/quizManager";
import QuizFeedback from "./QuizFeedback";
import QuizRadio from "./QuizRadio";

interface QuizProps {
  quizNumber: number;
  isLast: boolean;
  currentQuiz: IQuiz;
  onClickNextQuiz: (isSelected: boolean, isCorrect: boolean) => void;
  onClickShowResult: (isSelected: boolean, isCorrect: boolean) => void;
}

const Quiz = ({
  quizNumber,
  isLast,
  currentQuiz,
  onClickNextQuiz,
  onClickShowResult,
}: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const isCorrect = QuizManager.isCorrect(currentQuiz, selectedAnswer);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleClickNextQuiz = () => {
    onClickNextQuiz(!!selectedAnswer, isCorrect);
  };

  const handleClickShowResult = () => {
    onClickShowResult(!!selectedAnswer, isCorrect);
  };

  useEffect(() => {
    setSelectedAnswer("");
  }, [quizNumber]);

  return (
    <>
      <QuizFeedback isSelected={!!selectedAnswer} isCorrect={isCorrect} />
      <h1>{quizNumber} 번 문제</h1>
      <h2>{currentQuiz.question}</h2>
      <QuizRadio
        correctAnswer={currentQuiz.correct_answer}
        inCorrectAnswers={currentQuiz.incorrect_answers}
        onSelectAnswer={handleSelectAnswer}
      />
      {isLast ? (
        <button type="button" onClick={handleClickShowResult} disabled={!selectedAnswer}>
          결과 보기
        </button>
      ) : (
        <button type="button" onClick={handleClickNextQuiz} disabled={!selectedAnswer}>
          다음 문제
        </button>
      )}
    </>
  );
};

export default Quiz;
