import React from "react";
import { Layout } from "./components/common";
import { QuizContextProvider } from "./contexts/quiz";
import Router from "./router";
import QuizService from "./services/quiz";

const quizService = new QuizService();

const App = () => {
  return (
    <QuizContextProvider quizService={quizService}>
      <Layout>
        <Router />
      </Layout>
    </QuizContextProvider>
  );
};

export default App;
