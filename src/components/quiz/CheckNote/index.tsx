import React from "react";
import styled from "styled-components";
import { Text } from "~/components/atom";
import { IWrongQuiz } from "~/lib/models";
import { PALETTE } from "~/styles/theme";
import QuizRadioGroup from "../QuizRadioGroup";

interface CheckNoteProps {
  wrongQuizzes: IWrongQuiz[];
}

const CheckNote = ({ wrongQuizzes }: CheckNoteProps) => {
  const handleClick = () => {
    return;
  };

  return (
    <Container>
      {wrongQuizzes.map((wrongQuiz) => (
        <li key={wrongQuiz.quizNumber}>
          <Text size="lg" bold>
            {wrongQuiz.quizNumber}번 문제
          </Text>
          <Text size="md">{wrongQuiz.quiz.question}</Text>
          <QuizRadioGroup
            name={`quiz${wrongQuiz.quizNumber}`}
            correctAnswer={wrongQuiz.quiz.correct_answer}
            inCorrectAnswers={wrongQuiz.quiz.incorrect_answers}
            onSelectAnswer={handleClick}
          />

          <details>
            <summary>정답 보기</summary>
            <Text style={{ margin: "8px 16px 0" }}>{wrongQuiz.quiz.correct_answer}</Text>
          </details>
        </li>
      ))}
    </Container>
  );
};

export default CheckNote;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  & > li {
    box-sizing: border-box;
    border: 1px solid ${PALETTE.green[2]};
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
