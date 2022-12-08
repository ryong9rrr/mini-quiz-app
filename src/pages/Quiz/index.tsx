import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Spacer } from "~/components/atom";
import { RedirectionGuide } from "~/components/common";
import { Quiz, QuizProgress } from "~/components/quiz";
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
      <RedirectionGuide
        text="✋ 풀고 있는 퀴즈가 없어요!"
        path={ROUTE_PATHS.HOME}
        pathMessage="홈으로"
      />
    );
  }

  return (
    <Container>
      <QuizProgress allQuizCount={quizzes.length} currentQuizNumber={currentQuizNumber} />
      <Spacer height={20} />
      <Quiz
        quizNumber={currentQuizNumber}
        isLast={isLast}
        currentQuiz={currentQuiz}
        onClickNextQuiz={handleClickNextQuiz}
      />
    </Container>
  );
};

export default QuizPage;

const Container = styled.section`
  margin-top: 50px;
`;
