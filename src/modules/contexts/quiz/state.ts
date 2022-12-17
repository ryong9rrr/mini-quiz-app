import { IQuizContext } from "./types";

export const initialQuizContext: IQuizContext = {
  allQuizCount: 0,
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
  setNewQuizzes() {
    return;
  },
  goNextQuiz() {
    return;
  },
  match() {
    return false;
  },
};
