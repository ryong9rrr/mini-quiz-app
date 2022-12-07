import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ResultPage from ".";

describe("퀴즈 결과 페이지 렌더링 테스트", () => {
  test("퀴즈를 생성하지 않고 다 풀지 않은 상태라면 예외처리를 한다.", () => {
    render(<ResultPage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/아직/i)).toBeInTheDocument();
  });
});
