import { QuizManager } from "~/modules/manager";
import { mockQuizzes } from "~/tests-utils/mock";

describe("퀴즈 기능 테스트", () => {
  test("isFinished - 문제를 다 풀지 않았다면 false를 반환한다.", () => {
    const quizzesCount = 10;
    const currentQuizIndex = 0;
    const isFinished = QuizManager.isFinished(quizzesCount, currentQuizIndex);
    expect(isFinished).toEqual(false);
  });

  test("isFinished - 문제를 다 풀었다면 true를 반환한다.", () => {
    const quizzesCount = 10;
    const currentQuizIndex = 10;
    const isFinished = QuizManager.isFinished(quizzesCount, currentQuizIndex);
    expect(isFinished).toEqual(true);
  });

  test("isCorrect - 문제를 틀렸다면 false를 반환한다.", () => {
    const currentQuiz = mockQuizzes[0];
    const myAnswer = "absdf";
    const isFinished = QuizManager.isCorrect(currentQuiz, myAnswer);
    expect(isFinished).toEqual(false);
  });

  test("isCorrect - 문제를 맞았다면 true를 반환한다.", () => {
    const currentQuiz = mockQuizzes[0];
    const myAnswer = mockQuizzes[0].correct_answer;
    const isFinished = QuizManager.isCorrect(currentQuiz, myAnswer);
    expect(isFinished).toEqual(true);
  });

  test("getWrongQuizzes - 틀린 문제를 반환한다.", () => {
    const wrongQuizIndexNumbers = [0, 1];
    const wrongQuizzes = [
      { quizNumber: 1, quiz: mockQuizzes[0] },
      { quizNumber: 2, quiz: mockQuizzes[1] },
    ];
    expect(QuizManager.getWrongQuizzes(wrongQuizIndexNumbers, mockQuizzes)).toEqual(wrongQuizzes);
  });
});
