import React from "react";
import styled from "styled-components";

interface SpacerProps {
  height: number;
}

const Spacer = ({ ...props }: SpacerProps) => {
  return <Container {...props} />;
};

export default Spacer;

const Container = styled.div<SpacerProps>`
  height: ${({ height }) => height}px;
`;
