import React from "react";
import { Layout } from "./components/common";
import { QuizContextProvider } from "./modules/contexts/quiz";
import Router from "./router";

const App = () => {
  return (
    <QuizContextProvider>
      <Layout>
        <Router />
      </Layout>
    </QuizContextProvider>
  );
};

export default App;
