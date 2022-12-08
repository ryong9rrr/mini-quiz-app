import { WebStorage } from "~/lib/core";
import { IQuiz } from "~/lib/models";

const QUIZZES = "prev-quizzes";
const CURRENT_QUIZ_INDEX = "prev-currentQuizIndex";
const WRONG_QUIZ_INDEX_NUMBERS = "prev-wrongQuizIndexNumbers";

class QuizStorage extends WebStorage {
  constructor() {
    super("session");
  }

  getQuizzesData(): IQuiz[] {
    return this.getData(QUIZZES, []);
  }

  setQuizzesData(quizzes: IQuiz[]) {
    this.setData(QUIZZES, quizzes);
  }

  getCurrentIndexData(): number {
    return this.getData(CURRENT_QUIZ_INDEX, 0);
  }

  setCurrentIndexData(number: number) {
    this.setData(CURRENT_QUIZ_INDEX, number);
  }

  getWrongQuizIndexNumbersData(): number[] {
    return this.getData(WRONG_QUIZ_INDEX_NUMBERS, []);
  }

  setWrongQuizIndexNumbersData(numbers: number[]) {
    this.setData(WRONG_QUIZ_INDEX_NUMBERS, numbers);
  }
}

const quizStorage = new QuizStorage();

export default quizStorage;
