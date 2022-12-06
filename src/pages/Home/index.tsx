import React, { useState } from "react";
import { Button } from "~/components/common";
import quizApi from "~/lib/services/quiz";
import useQuiz from "~/store/hooks/useQuiz";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const { quizzes, setQuizzes } = useQuiz();

  const handleStartButton = async () => {
    setLoading(true);
    const { results: newQuizzes } = await quizApi.getQuizzes();
    setQuizzes(newQuizzes);
    setLoading(false);
  };

  if (loading) {
    return <h1>로딩 중...</h1>;
  }

  console.log(quizzes);

  return (
    <>
      <h1>퀴즈 시작하기</h1>
      <Button text="START" onClick={handleStartButton} />
    </>
  );
};

export default HomePage;
