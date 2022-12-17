import React from "react";
import styled from "styled-components";
import { Text } from "~/components/atom";
import { IQuiz } from "~/lib/models";
import QuizRadioGroup from "../QuizRadioGroup";

interface CurrentQuizProps {
  quizNumber: number;
  quiz: IQuiz;
  onSelectAnswer: (answer: string) => void;
}

const CurrentQuiz = ({ quizNumber, quiz, onSelectAnswer }: CurrentQuizProps) => {
  return (
    <Container>
      <Text bold size="xlg">
        {quizNumber}번 문제
      </Text>
      <Text size="lg">{quiz.question}</Text>
      <QuizRadioGroup
        name="quiz"
        correctAnswer={quiz.correct_answer}
        inCorrectAnswers={quiz.incorrect_answers}
        onSelectAnswer={onSelectAnswer}
      />
    </Container>
  );
};

export default CurrentQuiz;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
