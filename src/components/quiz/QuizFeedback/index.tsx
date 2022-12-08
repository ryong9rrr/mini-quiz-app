import React from "react";
import styled from "styled-components";
import { Text } from "~/components/atom";
import { PALETTE } from "~/styles/theme";

interface QuizFeedbackProps {
  isCorrect: boolean;
  height: number;
}

const QuizFeedback = ({ isCorrect, height }: QuizFeedbackProps) => {
  return (
    <Container height={height} isCorrect={isCorrect}>
      {isCorrect ? (
        <Text size="lg">🎊 정답입니다! 🎊</Text>
      ) : (
        <Text size="lg">🤔 다시 생각해보세요.</Text>
      )}
    </Container>
  );
};

export default QuizFeedback;

const Container = styled.div<QuizFeedbackProps>`
  margin: 30px auto;
  max-width: 200px;
  min-height: ${({ height }) => height - 52}px;
  border: 2px solid ${({ isCorrect }) => (isCorrect ? PALETTE.green[1] : PALETTE.red)};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
