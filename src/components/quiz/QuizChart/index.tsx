import React from "react";
import styled from "styled-components";
import { Text } from "~/components/atom";
import { PALETTE } from "~/styles/theme";

const QuizChart = () => {
  return (
    <>
      <Text size="lg" bold style={{ padding: "16px 0" }}>
        📊 차트
      </Text>
      <Container>차트</Container>
    </>
  );
};

export default QuizChart;

const Container = styled.section`
  border: 1px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 16px;
`;
