import React, { CSSProperties } from "react";
import { Progress } from "~/components/common";

interface QuizProgressProps {
  allQuizCount: number;
  currentQuizNumber: number;
  style?: CSSProperties;
}

const QuizProgress = ({ allQuizCount, currentQuizNumber, style }: QuizProgressProps) => {
  const progressRate = Math.round((currentQuizNumber / allQuizCount) * 100);
  return <Progress value={progressRate} style={style} />;
};

export default QuizProgress;
