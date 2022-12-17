import React from "react";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { mockQuizzes } from "~/tests-utils/mock";
import { QuizContextProvider, useQuiz } from "~/contexts/quiz";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QuizContextProvider hasStorage={false}>{children}</QuizContextProvider>
);

const startQuiz = (result: { current: ReturnType<typeof useQuiz> }) => {
  act(() => {
    result.current.setNewQuizzes(mockQuizzes);
  });
};

describe("QuizContext 상태 변경 테스트", () => {
  test("새로운 퀴즈를 시작한다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    expect(result.current.quizzes).toEqual(mockQuizzes);
  });

  test("다음 퀴즈로 넘어간다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    act(() => {
      result.current.goNextQuiz(true);
    });
    expect(result.current.currentQuizIndex).toEqual(1);
  });

  test("틀린 문제 개수를 반환한다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    act(() => {
      result.current.goNextQuiz(false);
    });
    const wrongCount = result.current.wrongQuizIndexNumbers.length;
    expect(wrongCount).toEqual(1);
  });
});
