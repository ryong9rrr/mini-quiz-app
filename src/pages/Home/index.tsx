import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/common";
import { useQuiz } from "~/modules/contexts/quiz";
import quizApi from "~/lib/services/quiz";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setNewQuizzes } = useQuiz();

  const handleClickStart = async () => {
    setLoading(true);
    const { results: newQuizzes } = await quizApi.getQuizzes();
    setNewQuizzes(newQuizzes);
    setLoading(false);
    navigate("/quiz");
  };

  if (loading) {
    return <h1>퀴즈 생성 중...</h1>;
  }

  return (
    <>
      <h1>퀴즈 시작하기</h1>
      <Button onClick={handleClickStart}>START</Button>
    </>
  );
};

export default HomePage;
