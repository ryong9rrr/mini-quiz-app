import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "~/store/hooks";

const QuizPage = () => {
  const navigate = useNavigate();
  const { currentQuiz, goNextQuiz } = useQuiz();
  const [nextButtonDisable, setNextButtonDisable] = useState(false);

  const handleNextButton = () => {
    if (nextButtonDisable) {
      goNextQuiz();
    }
  };

  useEffect(() => {
    if (!currentQuiz) {
      return;
    }
  }, [currentQuiz]);

  if (!currentQuiz) {
    return null;
  }

  return (
    <>
      <h1>퀴즈 풀기 페이지</h1>
      <div>
        <h2>{currentQuiz.question}</h2>
      </div>
      <button type="button" disabled={nextButtonDisable}>
        다음 문제
      </button>
    </>
  );
};

export default QuizPage;
