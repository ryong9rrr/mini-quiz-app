import React from "react";
import { Progress } from "~/components/common";

interface QuizProgressProps {
  allQuizCount: number;
  currentQuizNumber: number;
}

const QuizProgress = ({ allQuizCount, currentQuizNumber }: QuizProgressProps) => {
  const progressRate = Math.round((currentQuizNumber / allQuizCount) * 100);
  return <Progress value={progressRate} />;
};

export default QuizProgress;
