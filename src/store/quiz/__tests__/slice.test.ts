import { IQuiz } from "~/lib/models";
import { mockQuizzes } from "~/mock";
import reducer, { quizActions } from "../slice";
import { initialQuizState } from "../state";
import { QuizState } from "../types";

describe("store/quiz 리듀서 단위 테스트", () => {
  test("상태를 default로 초기화한다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [],
    };

    const result: QuizState = initialQuizState;

    expect(reducer(prevState, quizActions.init())).toEqual(result);
  });

  test("quizzes를 newQuizzes로 초기화한다.", () => {
    const prevState: QuizState = { ...initialQuizState };
    const nextQuizzes: IQuiz[] = [...mockQuizzes];
    const result: QuizState = {
      quizzes: nextQuizzes,
      currentQuizIndex: 0,
      wrongQuizIndexNumbers: [],
    };

    expect(reducer(prevState, quizActions.setQuizzes(nextQuizzes))).toEqual(result);
  });

  test("정답을 고르면 오답 인덱스가 추가되지 않는다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [],
    };

    const result: QuizState = {
      ...prevState,
      wrongQuizIndexNumbers: [],
    };

    expect(reducer(prevState, quizActions.selectAnswer(true))).toEqual(result);
  });

  test("정답을 골랐다가 오답을 고르면 오답 인덱스가 추가된다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [],
    };

    const result: QuizState = {
      ...prevState,
      wrongQuizIndexNumbers: [1],
    };

    expect(reducer(prevState, quizActions.selectAnswer(false))).toEqual(result);
  });

  test("오답을 고르면 오답 인덱스가 추가된다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [],
    };

    const result: QuizState = {
      ...prevState,
      wrongQuizIndexNumbers: [1],
    };

    expect(reducer(prevState, quizActions.selectAnswer(false))).toEqual(result);
  });

  test("오답을 골랐다가 정답을 고르면 오답 인덱스가 제거된다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [1],
    };

    const result: QuizState = {
      ...prevState,
      wrongQuizIndexNumbers: [],
    };

    expect(reducer(prevState, quizActions.selectAnswer(true))).toEqual(result);
  });

  test("1페이지에서는 이전 페이지를 누르면 그대로 1페이지이다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 0,
      wrongQuizIndexNumbers: [],
    };

    const result: QuizState = {
      ...prevState,
      currentQuizIndex: 0,
    };

    expect(reducer(prevState, quizActions.goPrevQuiz())).toEqual(result);
  });

  test("2페이지 이상에서 이전 페이지를 누르면 이전 페이지로 간다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [],
    };

    const result: QuizState = {
      ...prevState,
      currentQuizIndex: 0,
    };

    expect(reducer(prevState, quizActions.goPrevQuiz())).toEqual(result);
  });

  test("다음 페이지로 간다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 0,
      wrongQuizIndexNumbers: [],
    };

    const result: QuizState = {
      ...prevState,
      currentQuizIndex: 1,
    };

    expect(reducer(prevState, quizActions.goNextQuiz())).toEqual(result);
  });

  test("마지막 페이지에서 다음 페이지를 계속 눌러도 currentQuizIndex는 퀴즈 배열의 길이이다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: mockQuizzes.length - 1,
      wrongQuizIndexNumbers: [],
    };

    reducer(prevState, quizActions.goNextQuiz());
    reducer(prevState, quizActions.goNextQuiz());

    const result: QuizState = {
      ...prevState,
      currentQuizIndex: mockQuizzes.length,
    };

    expect(reducer(prevState, quizActions.goNextQuiz())).toEqual(result);
  });
});
