import React from "react";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  margin: 0 auto;
  min-width: 380px;
  max-width: 512px;
`;
