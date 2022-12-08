import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Quiz } from "~/components/quiz";
import { useQuiz } from "~/modules/contexts/quiz";
import { ROUTE_PATHS } from "~/router/paths";

const QuizPage = () => {
  const navigate = useNavigate();
  const { quizzes, currentQuizIndex, goNextQuiz } = useQuiz();
  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuizNumber = currentQuizIndex + 1;
  const isLast = currentQuizIndex + 1 === quizzes.length;

  const handleClickNextQuiz = (isSelected: boolean, isCorrect: boolean) => {
    if (!isSelected) {
      return;
    }
    goNextQuiz(isCorrect);
    if (isLast) {
      navigate(ROUTE_PATHS.RESULT);
    }
  };

  if (!currentQuiz) {
    return (
      <>
        <h1>풀고 있는 퀴즈가 없습니다. 홈으로 이동합니다.</h1>
        <NavLink to={ROUTE_PATHS.HOME}>홈으로</NavLink>
      </>
    );
  }

  return (
    <Quiz
      quizNumber={currentQuizNumber}
      isLast={isLast}
      currentQuiz={currentQuiz}
      onClickNextQuiz={handleClickNextQuiz}
    />
  );
};

export default QuizPage;
