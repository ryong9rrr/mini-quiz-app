import React from "react";
import { NavLink } from "react-router-dom";
import { RedirectionGuide } from "~/components/common";
import { QuizResult } from "~/components/quiz";
import { getElapsedTime } from "~/lib/utils";
import { useQuiz } from "~/modules/contexts/quiz";
import * as QuizManager from "~/modules/quizManager";
import { ROUTE_PATHS } from "~/router/paths";

const ResultPage = () => {
  const { quizzes, currentQuizIndex, wrongQuizIndexNumbers, startTime } = useQuiz();
  const isFinished = QuizManager.isFinished(quizzes.length, currentQuizIndex);
  const inCorrectCount = QuizManager.getWrongQuizzes(wrongQuizIndexNumbers, quizzes).length;
  const correctCount = quizzes.length - inCorrectCount;
  const times = getElapsedTime(startTime);

  if (!isFinished) {
    return (
      <RedirectionGuide
        text="✋ 아직 퀴즈를 다 풀지 않았어요!"
        path={ROUTE_PATHS.QUIZ}
        pathMessage="퀴즈 이어서 풀러가기"
      />
    );
  }

  return (
    <>
      <h1>퀴즈 결과 페이지</h1>
      <h2>수고하셨습니다.</h2>
      <NavLink to={ROUTE_PATHS.HOME}>새로운 퀴즈 풀기</NavLink>
      <QuizResult time={times} correctCount={correctCount} inCorrectCount={inCorrectCount} />
    </>
  );
};

export default ResultPage;
