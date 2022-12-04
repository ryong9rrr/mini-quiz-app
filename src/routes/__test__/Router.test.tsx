// app.test.js
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "~/App";
import routePath from "../routePath";
import { CHECK_NOTE, QUIZ, RESULT } from "../types";

describe("Router 테스트", () => {
  test("메인 페이지에 진입한다.", async () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText("퀴즈 시작하기")).toBeInTheDocument();
  });

  test("quiz 페이지에 진입한다.", () => {
    const quizPath = routePath.getPathUrl(QUIZ);

    render(
      <MemoryRouter initialEntries={[quizPath]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("퀴즈 풀기 페이지")).toBeInTheDocument();
  });

  test("퀴즈를 다 풀지 않고 result 페이지에 진입한다.", () => {
    const resultpath = routePath.getPathUrl(RESULT);

    render(
      <MemoryRouter initialEntries={[resultpath]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("아직 퀴즈를 모두 풀지 않았어요!")).toBeInTheDocument();
  });

  //TODO
  // "퀴즈를 다 풀고 result 페이지에 진입한다."

  test("퀴즈를 다 풀지 않고 check-note 페이지에 진입한다.", () => {
    const checkNotePath = routePath.getPathUrl(CHECK_NOTE);

    render(
      <MemoryRouter initialEntries={[checkNotePath]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("아직 퀴즈를 모두 풀지 않았어요!")).toBeInTheDocument();
  });

  //TODO
  // "퀴즈를 다 풀고 check-note 페이지에 진입한다."

  test("올바르지 않은 url로 접근하면 '404 Not Found'를 띄운다.", () => {
    const badPath = "/quizz";

    render(
      <MemoryRouter initialEntries={[badPath]}>
        <App />
      </MemoryRouter>,
    );

    // verify navigation to "no match" route
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });
});
