import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Text } from "~/components/atom";
import { ROUTE_PATHS } from "~/router/paths";
import { PALETTE } from "~/styles/theme";

type Time = {
  hour: number;
  min: number;
  sec: number;
};

interface QuizResultProps {
  time: Time;
  correctCount: number;
  inCorrectCount: number;
}

const QuizResult = ({ time, correctCount, inCorrectCount }: QuizResultProps) => {
  const navigate = useNavigate();
  const { hour, min, sec } = time;

  const handleClickCheckNote = () => {
    navigate(ROUTE_PATHS.CHECK_NOTE);
  };

  return (
    <>
      <Text size="lg" bold style={{ padding: "16px 0" }}>
        🔎 퀴즈 결과
      </Text>
      <Container>
        <li>
          틀린 문제 : {inCorrectCount}개
          <Button size="xsm" onClick={handleClickCheckNote} style={{ padding: "4px" }}>
            📝 오답 노트
          </Button>
        </li>
        <li>맞은 문제 : {correctCount}개</li>
        <li>
          소요 시간 : {hour} 시간 {min} 분 {sec}초
        </li>
      </Container>
    </>
  );
};

export default QuizResult;

const Container = styled.ul`
  border: 1px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 4px 16px;
  display: flex;
  flex-direction: column;

  li {
    padding: 12px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
