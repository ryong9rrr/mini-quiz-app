import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/common";
import quizApi from "~/lib/services/quiz";
import { useQuiz } from "~/store/hooks";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setNewQuizzes } = useQuiz();

  const handleStartButton = async () => {
    setLoading(true);
    const { results: newQuizzes } = await quizApi.getQuizzes();
    setLoading(false);
    setNewQuizzes(newQuizzes);
    navigate("/quiz");
  };

  if (loading) {
    return <h1>퀴즈 생성 중...</h1>;
  }

  return (
    <>
      <h1>퀴즈 시작하기</h1>
      <Button text="START" onClick={handleStartButton} />
    </>
  );
};

export default HomePage;
