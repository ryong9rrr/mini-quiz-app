import { IQuiz } from "~/lib/models";

const QUIZZES = "prev-quizzes";
const CURRENT_QUIZ_INDEX = "prev-currentQuizIndex";
const WRONG_QUIZ_INDEX_NUMBERS = "prev-wrongQuizIndexNumbers";

const storage = window.sessionStorage;

function getData<T>(key: string, defaultValue: T): T {
  try {
    const data = storage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

function setData<T>(key: string, value: T) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error("storage occur error");
  }
}

export default class QuizStorage {
  static getQuizzesData(): IQuiz[] {
    return getData(QUIZZES, []);
  }

  static setQuizzesData(quizzes: IQuiz[]) {
    setData(QUIZZES, quizzes);
  }

  static getCurrentIndexData(): number {
    return getData(CURRENT_QUIZ_INDEX, 0);
  }

  static setCurrentIndexData(number: number) {
    setData(CURRENT_QUIZ_INDEX, number);
  }

  static getWrongQuizIndexNumbersData(): number[] {
    return getData(WRONG_QUIZ_INDEX_NUMBERS, []);
  }

  static setWrongQuizIndexNumbersData(numbers: number[]) {
    setData(WRONG_QUIZ_INDEX_NUMBERS, numbers);
  }
}
