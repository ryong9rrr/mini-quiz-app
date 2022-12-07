import { QuizState } from "../quiz/types";

export interface IQuizStorage {
  getData: () => QuizState | null;
  setData: (state: QuizState) => void;
}

class QuizStorage implements IQuizStorage {
  KEY = "quiz-data" as const;
  storage = window.sessionStorage;

  getData() {
    const preData = this.storage.getItem("quiz-data");
    return preData ? JSON.parse(preData) : null;
  }

  setData(state: QuizState) {
    this.storage.setItem(this.KEY, JSON.stringify(state));
  }
}

const quizStorage = new QuizStorage();

export default quizStorage;
