import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Quiz } from "~/components/quiz";
import { mockQuizzes } from "~/tests-utils/mock";

describe("Quiz 렌더링 테스트", () => {
  test("렌더링 테스트", () => {
    const handleClickNextQuiz = () => {
      return;
    };
    render(
      <Quiz
        quizNumber={1}
        currentQuiz={mockQuizzes[0]}
        isLast={false}
        onClickNextQuiz={handleClickNextQuiz}
      />,
    );
    expect(screen.getByText(/1번 문제/i)).toBeInTheDocument();
  });

  test("문제를 선택하지 않으면 '다음 버튼'이 보이지 않는다.", () => {
    const handleClickNextQuiz = () => {
      return;
    };
    render(
      <Quiz
        quizNumber={1}
        currentQuiz={mockQuizzes[0]}
        isLast={false}
        onClickNextQuiz={handleClickNextQuiz}
      />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("문제를 선택하면 '다음 버튼'이 보인다.", async () => {
    const handleClickNextQuiz = () => {
      return;
    };
    render(
      <Quiz
        quizNumber={1}
        currentQuiz={mockQuizzes[0]}
        isLast={false}
        onClickNextQuiz={handleClickNextQuiz}
      />,
    );

    const $input = document.querySelector("input[type=radio]") as Element;
    await userEvent.click($input);

    expect(screen.queryByRole("button")).toBeInTheDocument();
  });
});
