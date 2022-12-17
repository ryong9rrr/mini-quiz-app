import { IQuiz, IWrongQuiz } from "~/lib/models";

export type QuizCount = {
  inCorrect: number;
  correct: number;
};

export type CurrentQuiz = {
  number: number;
  quiz: IQuiz | null;
  isLast: boolean;
};

export interface IQuizContext {
  allQuizCount: number;
  isFinished: boolean;
  wrongQuizzes: IWrongQuiz[];
  quizCount: QuizCount;
  currentQuiz: CurrentQuiz;
  match: (quiz: IQuiz | null, selectedAnswer: string | null) => boolean;
  setNewQuizzes: (newQuizzes: IQuiz[]) => void;
  goNextQuiz: (selectedAnswer: string) => void;
}
