import React from "react";
import styled from "styled-components";
import { Text } from "~/components/atom";
import { PALETTE } from "~/styles/theme";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const makeData = (inCorrectCount: number, correctCount: number) => ({
  labels: [""],
  datasets: [
    {
      label: "틀린 문제",
      data: [inCorrectCount],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "맞은 문제",
      data: [correctCount],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
});

interface QuizChartProps {
  inCorrectCount: number;
  correctCount: number;
}

const QuizChart = ({ inCorrectCount, correctCount }: QuizChartProps) => {
  const data = makeData(inCorrectCount, correctCount);

  return (
    <>
      <Text size="lg" bold style={{ padding: "16px 0" }}>
        📊 차트
      </Text>
      <Container>
        <Bar data={data} />
      </Container>
    </>
  );
};

export default QuizChart;

const Container = styled.section`
  border: 1px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
