import React from "react";
import { QuizContextProvider } from "./lib/contexts/quiz";
import Router from "./router";

const App = () => {
  return (
    <QuizContextProvider>
      <Router />
    </QuizContextProvider>
  );
};

export default App;
