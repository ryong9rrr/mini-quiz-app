import React from "react";
import "@testing-library/jest-dom";
import { mockQuizzes } from "~/test-utils/mock";
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import store from "~/store";
import useQuiz from "../useQuiz";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("useQuiz 기능 테스트", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    act(() => {
      result.current.setQuizzes(mockQuizzes);
    });
  });

  test("퀴즈 배열이 초기화 됐는지 확인한다.", async () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    expect(result.current.quizzes).toEqual(mockQuizzes);
  });
});
