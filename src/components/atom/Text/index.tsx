import React, { CSSProperties } from "react";
import styled from "styled-components";
import { FONT_SIZE } from "~/styles/theme";

interface TextProps {
  children: React.ReactNode;
  size?: keyof typeof FONT_SIZE;
  bold?: boolean;
  style?: CSSProperties;
}

const Text = ({ children, size, bold, style }: TextProps) => {
  return (
    <Container size={size} bold={bold} style={style}>
      {children}
    </Container>
  );
};

export default Text;

const Container = styled.div<TextProps>`
  font-size: ${({ size }) => FONT_SIZE[size || "md"]}px;
  font-weight: ${({ bold }) => (bold ? "600" : "400")};
`;
