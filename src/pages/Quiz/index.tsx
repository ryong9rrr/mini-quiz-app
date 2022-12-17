import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spacer } from "~/components/atom";
import { RedirectionGuide } from "~/components/common";
import { CurrentQuiz, QuizFeedback, QuizProgress } from "~/components/quiz";
import { useQuiz } from "~/modules/contexts/quiz";
import { TimeStorage } from "~/modules/storage";
import { ROUTE_PATHS } from "~/router/paths";

const QuizPage = () => {
  const navigate = useNavigate();
  const { allQuizCount, currentQuiz, goNextQuiz, match } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const isSelectedAnswer = typeof selectedAnswer === "string";
  const buttonDisabled = !selectedAnswer;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleClickNextQuiz = () => {
    if (!isSelectedAnswer) {
      return;
    }
    goNextQuiz(match(currentQuiz.quiz, selectedAnswer));
    if (currentQuiz.isLast) {
      TimeStorage.setEndTimeData();
      navigate(ROUTE_PATHS.RESULT);
    }
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuiz.number]);

  if (!currentQuiz.quiz) {
    return (
      <RedirectionGuide
        text="✋ 풀고 있는 퀴즈가 없어요!"
        path={ROUTE_PATHS.HOME}
        pathMessage="홈으로"
      />
    );
  }

  return (
    <>
      <Spacer height={50} />
      <QuizProgress allQuizCount={allQuizCount} currentQuizNumber={currentQuiz.number} />
      <Spacer height={20} />
      <QuizFeedback
        isView={isSelectedAnswer}
        isCorrect={match(currentQuiz.quiz, selectedAnswer)}
        height={40}
      />

      <CurrentQuiz
        quizNumber={currentQuiz.number}
        quiz={currentQuiz.quiz}
        onSelectAnswer={handleSelectAnswer}
      />

      {isSelectedAnswer && (
        <Button
          onClick={handleClickNextQuiz}
          disabled={buttonDisabled}
          style={{ marginTop: "40px", width: "100%" }}
        >
          {currentQuiz.isLast ? "결과 보기" : "다음 문제"}
        </Button>
      )}
    </>
  );
};

export default QuizPage;
