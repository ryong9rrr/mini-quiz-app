import React from "react";
import styled from "styled-components";
import { Spacer, Text } from "~/components/atom";
import { RedirectionGuide } from "~/components/common";
import { CheckNote } from "~/components/quiz";
import { useQuiz } from "~/modules/contexts/quiz";
import * as QuizManager from "~/modules/quizManager";
import { ROUTE_PATHS } from "~/router/paths";

const CheckNotePage = () => {
  const { quizzes, currentQuizIndex, wrongQuizIndexNumbers } = useQuiz();
  const isFinished = QuizManager.isFinished(quizzes.length, currentQuizIndex);
  const wrongQuizzes = QuizManager.getWrongQuizzes(wrongQuizIndexNumbers, quizzes);

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
      <Text size="xlg" bold>
        📝 오답 노트
      </Text>
      <Spacer height={20} />
      <CheckNote wrongQuizzes={wrongQuizzes} />
    </>
  );
};

export default CheckNotePage;
