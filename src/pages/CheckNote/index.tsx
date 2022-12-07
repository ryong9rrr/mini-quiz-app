import React from "react";
import { NavLink } from "react-router-dom";
import { useQuiz } from "~/modules/contexts/quiz";
import QuizManager from "~/modules/quizManager";

const CheckNotePage = () => {
  const { quizzes, currentQuizIndex } = useQuiz();
  const isFinished = QuizManager.isFinished(quizzes.length, currentQuizIndex);

  if (!isFinished) {
    return (
      <>
        <h1>아직 퀴즈를 다 풀지 않았어요!</h1>
        <NavLink to="/quiz">퀴즈 이어서 풀러가기</NavLink>
      </>
    );
  }

  return (
    <>
      <h1>오답 노트 페이지</h1>
      <div>오답 노트</div>
    </>
  );
};

export default CheckNotePage;
