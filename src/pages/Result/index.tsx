import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Text } from "~/components/atom";
import { RedirectionGuide } from "~/components/common";
import { QuizChart, QuizResult } from "~/components/quiz";
import { convertTime } from "~/lib/utils";
import { useQuiz } from "~/contexts/quiz";
import { ROUTE_PATHS } from "~/router/paths";

const ResultPage = () => {
  const navigate = useNavigate();
  const { isFinished, quizCount, timeRate } = useQuiz();
  const [hour, min, sec] = convertTime(timeRate);

  const handleClickNewQuiz = () => {
    navigate(ROUTE_PATHS.HOME);
  };

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
      <Text size="xlg" bold style={{ marginBottom: "20px" }}>
        👏 수고하셨습니다.
      </Text>
      <QuizResult
        time={{ hour, min, sec }}
        correctCount={quizCount.correct}
        inCorrectCount={quizCount.inCorrect}
      />
      <QuizChart correctCount={quizCount.correct} inCorrectCount={quizCount.inCorrect} />
      <ButtonContainer>
        <Button onClick={handleClickNewQuiz}>새로운 퀴즈 풀기</Button>
      </ButtonContainer>
    </>
  );
};

export default ResultPage;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
