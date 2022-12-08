import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Loading, Text } from "~/components/common";
import { useQuiz } from "~/modules/contexts/quiz";
import quizApi from "~/lib/services/quiz";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { PALETTE } from "~/styles/theme";

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

  return (
    <>
      <Helmet title="홈 | Mini-Quiz" />
      <Container>
        {loading ? (
          <>
            <Loading />
            <Text>퀴즈를 생성 중입니다...</Text>
          </>
        ) : (
          <>
            <Text size="xlg" bold style={{ margin: "16px 0" }}>
              퀴즈를 시작해볼까요?
            </Text>
            <Button size="lg" onClick={handleClickStart}>
              START
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  margin-top: 150px;
  padding: 24px;
  border: 2px solid ${PALETTE.green[1]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
`;
