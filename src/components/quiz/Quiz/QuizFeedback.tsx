import React from "react";

interface QuizFeedback {
  isSelected: boolean;
  isCorrect: boolean;
}

const QuizFeedback = ({ isSelected, isCorrect }: QuizFeedback) => {
  if (!isSelected) {
    return null;
  }

  return <div>{isCorrect ? "정답입니다!" : "다시 생각해보세요"}</div>;
};

export default QuizFeedback;
