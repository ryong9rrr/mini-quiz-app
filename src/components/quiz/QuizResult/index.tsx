import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Text } from "~/components/atom";
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
  const { hour, min, sec } = time;
  return (
    <>
      <Text size="lg" bold style={{ padding: "16px 0" }}>
        🔎 퀴즈 결과
      </Text>
      <Container>
        <li>
          소요 시간 : {hour} 시간 {min} 분 {sec}초
        </li>
        <li>맞은 문제 {correctCount}개</li>
        <li>
          틀린 문제 : {inCorrectCount}개<NavLink to="/check-note">오답노트</NavLink>
        </li>
      </Container>
    </>
  );
};

export default QuizResult;

const Container = styled.ul`
  border: 1px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
