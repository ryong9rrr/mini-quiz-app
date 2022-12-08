import { IQuiz } from "~/lib/models";

export const isFinished = (quizzesCount: number, currentQuizIndex: number) => {
  return quizzesCount > 0 && currentQuizIndex >= quizzesCount;
};

export const isCorrect = (currentQuiz: IQuiz, selectedAnswer: string) => {
  return currentQuiz.correct_answer === selectedAnswer;
};
export const getWrongQuizzes = (wrongQuizIndexNumbers: number[], quizzes: IQuiz[]) => {
  return wrongQuizIndexNumbers.map((indexNumber) => quizzes[indexNumber]);
};
