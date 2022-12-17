import { QuizContextValue } from "./types";

export const initialQuizContext: QuizContextValue = {
  loading: false,
  allQuizCount: 0,
  timeRate: 0,
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