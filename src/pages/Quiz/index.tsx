import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Spacer } from "~/components/atom";
import { RedirectionGuide } from "~/components/common";
import { Quiz, QuizProgress } from "~/components/quiz";
import { useQuiz } from "~/modules/contexts/quiz";
import { TimeStorage } from "~/modules/storage";
import { ROUTE_PATHS } from "~/router/paths";

const QuizPage = () => {
  const navigate = useNavigate();
  const { allQuizCount, currectQuiz, goNextQuiz } = useQuiz();
  const { quiz, number: quizNumber, isLast } = currectQuiz;

  const handleClickNextQuiz = (isSelected: boolean, isCorrect: boolean) => {
    if (!isSelected) {
      return;
    }
    goNextQuiz(isCorrect);
    if (isLast) {
      TimeStorage.setEndTimeData();
      navigate(ROUTE_PATHS.RESULT);
    }
  };

  if (!quiz) {
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
      <QuizProgress allQuizCount={allQuizCount} currentQuizNumber={quizNumber} />
      <Spacer height={20} />
      <Quiz
        quizNumber={quizNumber}
        isLast={isLast}
        currentQuiz={quiz}
        onClickNextQuiz={handleClickNextQuiz}
      />
    </Container>
  );
};

export default QuizPage;

const Container = styled.section`
  margin-top: 50px;
`;
