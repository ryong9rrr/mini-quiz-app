import React from "react";
import { useQuiz } from "~/modules/contexts/quiz";
import QuizManager from "~/modules/quizManager";

const CheckNotePage = () => {
  const { quizzes, currentQuizIndex } = useQuiz();
  const isFinished = QuizManager.isFinished(quizzes.length, currentQuizIndex);

  if (!isFinished) {
    return <h1>아직 퀴즈를 다 풀지 않았어요!</h1>;
  }

  return (
    <>
      <h1>오답 노트 페이지</h1>
      <div>오답 노트</div>
    </>
  );
};

export default CheckNotePage;
