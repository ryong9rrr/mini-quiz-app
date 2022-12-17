import { QuizServiceInterface } from "~/interfaces";
import { Api, WebStorage } from "../lib/core";
import { IQuiz, QuizType } from "../lib/models";

const QUIZZES = "prev-quizzes";
const CURRENT_QUIZ_INDEX = "prev-currentQuizIndex";
const WRONG_QUIZ_INDEX_NUMBERS = "prev-wrongQuizIndexNumbers";

type Response = {
  data: {
    response_code: number;
    results: IQuiz[];
  };
};

function makeQuery({ amount, type }: { amount: number; type: QuizType }) {
  return { amount, type };
}

const fakePromise = <T>(f: () => T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(f());
    }, 100);
  });
};

export default class QuizService extends Api implements QuizServiceInterface {
  private dataBase = new WebStorage("session");

  async generateQuizzes(): Promise<void> {
    const query = makeQuery({ amount: 10, type: "multiple" });
    const response: Response = await this.baseRequest.get("", {
      params: query,
    });
    if (response.data && response.data.response_code !== 0) {
      throw new Error("data is nothing. Probably url is wrong.");
    }

    this.setQuizzesData(response.data.results);
    this.setWrongQuizIndexNumbersData([]);
    this.setCurrentIndexData(0);
  }

  async getData() {
    const quizzesData = await this.getQuizzesData();
    const currentIndexData = await this.getCurrentIndexData();
    const wrongQuizIndexNumbersData = await this.getWrongQuizIndexNumbersData();

    return {
      quizzesData,
      currentIndexData,
      wrongQuizIndexNumbersData,
    };
  }

  async setQuizzesData(quizzes: IQuiz[]) {
    await fakePromise(() => this.dataBase.setData(QUIZZES, quizzes));
  }

  async setCurrentIndexData(number: number) {
    await fakePromise(() => this.dataBase.setData(CURRENT_QUIZ_INDEX, number));
  }

  async setWrongQuizIndexNumbersData(numbers: number[]) {
    await fakePromise(() => this.dataBase.setData(WRONG_QUIZ_INDEX_NUMBERS, numbers));
  }

  private async getQuizzesData() {
    const result = await fakePromise(() => this.dataBase.getData<IQuiz[]>(QUIZZES, []));
    return result;
  }

  private async getCurrentIndexData() {
    const result = await fakePromise(() => this.dataBase.getData(CURRENT_QUIZ_INDEX, 0));
    return result;
  }

  private async getWrongQuizIndexNumbersData() {
    const result = await fakePromise(() =>
      this.dataBase.getData<number[]>(WRONG_QUIZ_INDEX_NUMBERS, []),
    );
    return result;
  }
}
