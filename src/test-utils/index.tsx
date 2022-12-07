import { act } from "@testing-library/react";
import React from "react";
import { QuizContextProvider, useQuiz } from "~/modules/contexts/quiz";
import { mockQuizzes } from "./mock";

export const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QuizContextProvider hasStorage={false}>{children}</QuizContextProvider>
);

export const startQuiz = (result: { current: ReturnType<typeof useQuiz> }) => {
  act(() => {
    result.current.setNewQuizzes(mockQuizzes);
  });
};
