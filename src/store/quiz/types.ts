import { IQuiz } from "~/lib/models";

export type QuizState = {
  quizzes: IQuiz[];
  currentQuizIndex: number;
  wrongQuizIndexNumbers: number[];
};
