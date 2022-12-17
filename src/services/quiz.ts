import { QuizServiceInterface } from "~/interfaces";
import { Api, WebStorage } from "../lib/core";
import { IQuiz, QuizType } from "../lib/models";

const QUIZZES = "prev-quizzes";
const CURRENT_QUIZ_INDEX = "prev-currentQuizIndex";
const WRONG_QUIZ_INDEX_NUMBERS = "prev-wrongQuizIndexNumbers";
const START_TIME = "start-time";
const END_TIME = "end-time";

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

    await this.setQuizzesData(response.data.results);
    await this.setWrongQuizIndexNumbersData([]);
    await this.setCurrentIndexData(0);
    await this.setStartTime();
  }

  async getData() {
    const quizzesData = await this.getQuizzesData();
    const currentIndexData = await this.getCurrentIndexData();
    const wrongQuizIndexNumbersData = await this.getWrongQuizIndexNumbersData();
    const timeRateData = await this.getTimeRate();

    return {
      quizzesData,
      currentIndexData,
      wrongQuizIndexNumbersData,
      timeRateData,
    };
  }

  async setQuizzesData(quizzes: IQuiz[]) {
    await fakePromise(() => this.dataBase.setData(QUIZZES, quizzes));
  }

  async setCurrentIndexData(number: number) {
    await fakePromise(() => this.dataBase.setData(CURRENT_QUIZ_INDEX, number));
    await this.setEndTimeData();
  }

  async setWrongQuizIndexNumbersData(numbers: number[]) {
    await fakePromise(() => this.dataBase.setData(WRONG_QUIZ_INDEX_NUMBERS, numbers));
  }

  private async getTimeRate(): Promise<number> {
    const endTime = await fakePromise(() => this.dataBase.getData(END_TIME, 0));
    const startTime = await fakePromise(() => this.dataBase.getData(START_TIME, 0));
    return Math.floor((endTime - startTime) / 1000);
  }

  private async setStartTime() {
    await fakePromise(() => this.dataBase.setData(START_TIME, Date.now()));
  }

  private async setEndTimeData() {
    await fakePromise(() => this.dataBase.setData(END_TIME, Date.now()));
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
