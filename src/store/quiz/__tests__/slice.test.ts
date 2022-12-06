import { IQuiz } from "~/lib/models";
import reducer, { quizActions } from "../slice";
import { initialQuizState } from "../state";
import { QuizState } from "../types";

const mockQuizzes: IQuiz[] = [
  {
    category: "Celebrities",
    type: "multiple",
    difficulty: "medium",
    question: "Which American celebrity died in 1977 playing golf in La Moraleja, Madrid?",
    correct_answer: "Bing Crosby",
    incorrect_answers: ["Elvis Presley", "Charlie Chaplin", "Groucho Marx"],
  },
  {
    category: "Entertainment: Television",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which actor portrays &quot;Walter White&quot; in the series &quot;Breaking Bad&quot;?",
    correct_answer: " Bryan Cranston",
    incorrect_answers: ["Andrew Lincoln", "Aaron Paul", "RJ Mitte"],
  },
];

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
});
