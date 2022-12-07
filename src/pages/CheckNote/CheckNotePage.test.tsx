import { act, render, renderHook, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "~/App";
import { useQuiz } from "~/modules/contexts/quiz";
import { startQuiz, wrapper } from "~/test-utils";

describe("오답 노트 페이지 렌더링 테스트", () => {
  test("퀴즈를 생성하지 않고 다 풀지 않은 상태라면 예외처리를 한다.", () => {
    render(
      <MemoryRouter initialEntries={["/check-note"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/아직/i)).toBeInTheDocument();
  });

  test("퀴즈를 생성하고 다 풀지 않은 상태라면 예외처리를 한다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    act(() => {
      result.current.goNextQuiz(true);
    });

    render(
      <MemoryRouter initialEntries={["/check-note"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/아직/i)).toBeInTheDocument();
  });

  // test("퀴즈를 다 풀었다면 퀴즈 페이지가 렌더링된다.", () => {
  //   const { result } = renderHook(() => useQuiz(), { wrapper });
  //   startQuiz(result);
  //   mockQuizzes.forEach(() => {
  //     act(() => {
  //       result.current.goNextQuiz(true);
  //     });
  //   });

  //   render(
  //     <MemoryRouter initialEntries={["/result"]}>
  //       <App />
  //     </MemoryRouter>,
  //   );

  //   expect(screen.getByText(/결과/i)).toBeInTheDocument();
  // });
});
