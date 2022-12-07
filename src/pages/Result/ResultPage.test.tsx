import { act, render, renderHook, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { useQuiz } from "~/modules/contexts/quiz";
import { startQuiz, wrapper } from "~/test-utils";
import ResultPage from ".";

describe("퀴즈 결과 페이지 렌더링 테스트", () => {
  test("퀴즈를 생성하지 않고 다 풀지 않은 상태라면 예외처리를 한다.", () => {
    render(<ResultPage />);
    expect(screen.getByText(/아직/i)).toBeInTheDocument();
  });

  test("퀴즈를 생성하고 다 풀지 않은 상태라면 예외처리를 한다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    act(() => {
      result.current.goNextQuiz(true);
    });

    render(<ResultPage />);

    expect(screen.getByText(/아직/i)).toBeInTheDocument();
  });
});
