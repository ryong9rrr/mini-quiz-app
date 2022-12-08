import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Spacer } from "~/components/atom";
import { IQuiz } from "~/lib/models";
import * as QuizManager from "~/modules/quizManager";
import QuizFeedback from "./QuizFeedback";
import Question from "../Question";

interface QuizProps {
  quizNumber: number;
  isLast: boolean;
  currentQuiz: IQuiz;
  onClickNextQuiz: (isSelected: boolean, isCorrect: boolean) => void;
}

const Quiz = ({ quizNumber, isLast, currentQuiz, onClickNextQuiz }: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const isCorrect = QuizManager.isCorrect(currentQuiz, selectedAnswer);
  const isSelected = !!selectedAnswer;
  const nextButtonDisabled = !selectedAnswer;

  const handleSelectRadio = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleClickNextQuiz = () => {
    onClickNextQuiz(isSelected, isCorrect);
  };

  useEffect(() => {
    setSelectedAnswer("");
  }, [quizNumber]);

  return (
    <>
      {isSelected ? <QuizFeedback isCorrect={isCorrect} height={80} /> : <Spacer height={20} />}
      <Container>
        <Question
          quizNumber={quizNumber}
          currentQuiz={currentQuiz}
          onSelectAnswer={handleSelectRadio}
        />

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
