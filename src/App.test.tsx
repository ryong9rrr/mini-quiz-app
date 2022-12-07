import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("App 통합테스트", () => {
  test("START 버튼을 찾는다.", () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText("START")).toBeInTheDocument();
  });

  // test("START 버튼을 누르면 퀴즈 페이지로 이동한다.", () => {
  //   render(<App />, { wrapper: BrowserRouter });
  //   const $startButton = screen.getByRole("button");
  //   userEvent.click($startButton);
  //   expect(screen.getByText("퀴즈")).toBeInTheDocument();
  // });
});
