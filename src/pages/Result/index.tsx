import React from "react";
import { NavLink } from "react-router-dom";
import { QuizResult } from "~/components/quiz";
import { useQuiz } from "~/modules/contexts/quiz";
import QuizManager from "~/modules/quizManager";

const ResultPage = () => {
  const { quizzes, currentQuizIndex, wrongQuizIndexNumbers } = useQuiz();
  const isFinished = QuizManager.isFinished(quizzes.length, currentQuizIndex);
  const inCorrectCount = QuizManager.getWrongQuizzes(wrongQuizIndexNumbers, quizzes).length;
  const correctCount = quizzes.length - inCorrectCount;

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
      <h1>퀴즈 결과 페이지</h1>
      <QuizResult
        time="1시간 30분 21초"
        correctCount={correctCount}
        inCorrectCount={inCorrectCount}
      />
    </>
  );
};

export default ResultPage;
