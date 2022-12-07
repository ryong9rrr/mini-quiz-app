import React from "react";
import { useQuiz } from "~/modules/contexts/quiz";
import QuizManager from "~/modules/quizManager";

const ResultPage = () => {
  const { quizzes, currentQuizIndex } = useQuiz();
  const isFinished = QuizManager.isFinished(quizzes.length, currentQuizIndex);

  if (!isFinished) {
    return <h1>아직 퀴즈를 다 풀지 않았어요!</h1>;
  }

  return (
    <>
      <h1>퀴즈 결과 페이지</h1>
      <div>퀴즈 결과</div>
    </>
  );
};

export default ResultPage;
