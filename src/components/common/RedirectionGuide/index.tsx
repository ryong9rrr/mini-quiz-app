import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Text } from "~/components/atom";
import { PALETTE } from "~/styles/theme";

interface RedirectionGuideProps {
  text: string;
  path: string;
  pathMessage: string;
}

const RedirectionGuide = ({ text, path, pathMessage }: RedirectionGuideProps) => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate(path);
  };

  return (
    <Container>
      <Text size="xlg">{text}</Text>
      <Button onClick={handleClickButton}>{pathMessage}</Button>
    </Container>
  );
};

export default RedirectionGuide;

const Container = styled.div`
  margin-top: 50px;
  border: 2px solid ${PALETTE.green[1]};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
