import { QuizContextValue } from "./types";

export const initialQuizContextValue: QuizContextValue = {
  loading: false,
  allQuizCount: 0,
  timeRate: null,
  isFinished: false,
  wrongQuizzes: [],
  quizCount: {
    inCorrect: 0,
    correct: 0,
  },
  currentQuiz: {
    number: 0,
    quiz: null,
    isLast: false,
  },
  createQuizzes() {
    return;
  },
  goNextQuiz() {
    return;
  },
  match() {
    return false;
  },
};
