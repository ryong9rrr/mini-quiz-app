import React from "react";
import "@testing-library/jest-dom";
import { mockQuizzes } from "~/test-utils/mock";
import { act, renderHook, RenderResult } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import store from "~/store";
import { QuizState } from "~/store/quiz/types";
import { initialQuizState } from "~/store/quiz/state";
import useQuiz from "../useQuiz";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const makeRandomUserAnswers = (length: number) => {
  const makeRandomBoolean = () => Math.random() * 10 < 5;
  const userAnswers = Array.from({ length }, () => makeRandomBoolean());
  const correctCount = userAnswers.filter((answer) => answer === true).length;
  const wrongCount = length - correctCount;
  return { userAnswers, correctCount, wrongCount };
};

const getSortedWrongQuizzes = (userAnswers: boolean[]) => {
  const wrongQuizzesResult = [];
  for (let index = 0; index < mockQuizzes.length; index += 1) {
    if (!userAnswers[index]) {
      wrongQuizzesResult.push(mockQuizzes[index]);
    }
  }
  return wrongQuizzesResult;
};

const getQuestions = () => {
  return mockQuizzes.map((quiz) => ({
    correctAnswer: quiz.correct_answer,
    wrongAnswers: [...quiz.incorrect_answers],
  }));
};

const startQuiz = (result: RenderResult<ReturnType<typeof useQuiz>>) => {
  act(() => {
    result.current.setNewQuizzes(mockQuizzes);
  });
};

describe("useQuiz 기능 테스트", () => {
  test("새로운 퀴즈를 시작한다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    expect(result.current.quizzes).toEqual(mockQuizzes);
  });

  test("처음 퀴즈를 시작하면 퀴즈를 다 풀지 않은 것이다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    expect(result.current.isFinished).toEqual(false);
  });

  test("마지막 퀴즈를 풀고 다음으로 넘어가면 퀴즈를 다 푼 것이다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    mockQuizzes.forEach(() => {
      act(() => {
        result.current.goNextQuiz();
      });
    });
    expect(result.current.isFinished).toEqual(true);
  });

  test("틀린 문제 세기", () => {
    const { userAnswers, wrongCount } = makeRandomUserAnswers(mockQuizzes.length);
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    userAnswers.forEach((answer) => {
      act(() => {
        result.current.selectAnswer(answer);
        result.current.goNextQuiz();
      });
    });
    expect(result.current.wrongQuizzesCount).toEqual(wrongCount);
  });

  test("맞은 문제 세기", () => {
    const { userAnswers, correctCount } = makeRandomUserAnswers(mockQuizzes.length);
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    userAnswers.forEach((answer) => {
      act(() => {
        result.current.selectAnswer(answer);
        result.current.goNextQuiz();
      });
    });
    expect(result.current.correctQuizzesCount).toEqual(correctCount);
  });

  test("오답인 퀴즈들 가져오기", () => {
    const { userAnswers } = makeRandomUserAnswers(mockQuizzes.length);
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    userAnswers.forEach((answer) => {
      act(() => {
        result.current.selectAnswer(answer);
        result.current.goNextQuiz();
      });
    });

    expect(result.current.wrongQuizzes).toEqual(getSortedWrongQuizzes(userAnswers));
  });

  test("풀고 있는 문제가 정답인지 아닌지 확인한다.", () => {
    const answers = getQuestions();
    const { result } = renderHook(() => useQuiz(), { wrapper });
    startQuiz(result);
    answers.forEach(({ correctAnswer, wrongAnswers }) => {
      act(() => {
        wrongAnswers.forEach((wrongAnswer) => {
          expect(result.current.isCorrect(wrongAnswer)).toEqual(false);
        });
        expect(result.current.isCorrect(correctAnswer)).toEqual(true);
        result.current.selectAnswer(true);
        result.current.goNextQuiz();
      });
    });
  });

  test("이전 상태가 있다면 이전 상태를 가진다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [0],
    };
    const { result } = renderHook(() => useQuiz(), { wrapper });
    act(() => {
      result.current.preFetch(prevState);
    });
    expect(result.current.currentQuizIndex).toEqual(1);
  });

  test("이전 상태가 없다면 기본 상태를 가진다.", () => {
    const { result } = renderHook(() => useQuiz(), { wrapper });
    act(() => {
      result.current.preFetch(null);
    });
    expect(result.current.currentQuizIndex).toEqual(initialQuizState.currentQuizIndex);
  });
});
