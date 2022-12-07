import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "~/App";

describe("오답 노트 페이지 렌더링 테스트", () => {
  test("퀴즈를 생성하지 않고 다 풀지 않은 상태라면 예외처리를 한다.", () => {
    render(
      <MemoryRouter initialEntries={["/check-note"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/아직/i)).toBeInTheDocument();
  });
});
