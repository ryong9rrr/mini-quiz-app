import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Quiz } from "~/components/quiz";
import { useQuiz } from "~/modules/contexts/quiz";

const QuizPage = () => {
  const navigate = useNavigate();
  const { quizzes, currentQuizIndex, goNextQuiz } = useQuiz();
  const currentQuiz = quizzes[currentQuizIndex];

  const handleClickNextQuiz = (isSelected: boolean, isCorrect: boolean) => {
    if (!isSelected) {
      return;
    }
    goNextQuiz(isCorrect);
  };

  const handleClickShowResult = (isSelected: boolean, isCorrect: boolean) => {
    if (!isSelected) {
      return;
    }
    goNextQuiz(isCorrect);
    navigate("/result");
  };

  if (!currentQuiz) {
    return (
      <>
        <h1>풀고 있는 퀴즈가 없습니다. 홈으로 이동합니다.</h1>
        <NavLink to="/">홈으로</NavLink>
      </>
    );
  }

  return (
    <Quiz
      quizNumber={currentQuizIndex + 1}
      isLast={currentQuizIndex + 1 === quizzes.length}
      currentQuiz={currentQuiz}
      onClickNextQuiz={handleClickNextQuiz}
      onClickShowResult={handleClickShowResult}
    />
  );
};

export default QuizPage;
