import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { PAGE_TITLE } from "~/router/paths";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const title = (PAGE_TITLE as { [key: string]: string })[pathname] || "404 | Mini Quiz";
  return (
    <Container>
      <Helmet title={title} />
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
  padding: 0 16px;
`;
