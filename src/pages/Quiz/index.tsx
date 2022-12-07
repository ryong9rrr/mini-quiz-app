import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RandomQuizList } from "~/components/quiz";
import { useQuiz } from "~/modules/contexts/quiz";

const QuizPage = () => {
  const navigate = useNavigate();
  const { quizzes, currentQuizIndex, goNextQuiz } = useQuiz();
  const currentQuiz = quizzes[currentQuizIndex];

  const handleGoNextQuiz = () => {
    const isSelected = true;
    if (isSelected) {
      goNextQuiz(true);
    }
  };

  const handleGoResultPage = () => {
    const isSelected = true;
    if (isSelected) {
      goNextQuiz(true);
      navigate("/result");
    }
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
    <>
      <h1>{currentQuizIndex + 1} 번 문제</h1>
      <h2>{currentQuiz.question}</h2>
      <RandomQuizList
        correctAnswer={currentQuiz.correct_answer}
        inCorrectAnswers={currentQuiz.incorrect_answers}
      />
      {currentQuizIndex + 1 === quizzes.length ? (
        <button type="button" onClick={handleGoResultPage}>
          결과 보기
        </button>
      ) : (
        <button type="button" onClick={handleGoNextQuiz}>
          다음 문제
        </button>
      )}
    </>
  );
};

export default QuizPage;
