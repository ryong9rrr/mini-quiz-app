import React from "react";
import { QuizContextProvider } from "./modules/contexts/quiz";
import Router from "./router";

const App = () => {
  return (
    <QuizContextProvider>
      <Router />
    </QuizContextProvider>
  );
};

export default App;
