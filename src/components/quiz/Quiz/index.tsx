import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Spacer, Text } from "~/components/atom";
import { IQuiz } from "~/lib/models";
import { useQuiz } from "~/modules/contexts/quiz";
import QuizFeedback from "../QuizFeedback";
import QuizRadioGroup from "../QuizRadioGroup";

interface QuizProps {
  quizNumber: number;
  isLast: boolean;
  currentQuiz: IQuiz;
  onClickNextQuiz: (isSelected: boolean, isCorrect: boolean) => void;
}

const Quiz = ({ quizNumber, isLast, currentQuiz, onClickNextQuiz }: QuizProps) => {
  // 여기서 훅을 부르면 안됨.
  const { isCorrect } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const correctResult = isCorrect(currentQuiz, selectedAnswer);
  const isSelected = !!selectedAnswer;
  const nextButtonDisabled = !selectedAnswer;

  const handleSelectRadio = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleClickNextQuiz = () => {
    onClickNextQuiz(isSelected, correctResult);
  };

  useEffect(() => {
    setSelectedAnswer("");
  }, [quizNumber]);

  return (
    <>
      {isSelected ? <QuizFeedback isCorrect={correctResult} height={40} /> : <Spacer height={40} />}
      <Container>
        <>
          <Text bold size="xlg">
            {quizNumber}번 문제
          </Text>
          <Text size="lg">{currentQuiz.question}</Text>
          <QuizRadioGroup
            name="quiz"
            correctAnswer={currentQuiz.correct_answer}
            inCorrectAnswers={currentQuiz.incorrect_answers}
            onSelectAnswer={handleSelectRadio}
          />
        </>
        <Spacer height={40} />
        {isSelected && (
          <Button onClick={handleClickNextQuiz} disabled={nextButtonDisabled}>
            {isLast ? "결과 보기" : "다음 문제"}
          </Button>
        )}
      </Container>
    </>
  );
};

export default Quiz;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
