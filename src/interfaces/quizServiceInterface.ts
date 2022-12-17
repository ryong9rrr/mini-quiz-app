import { IQuiz } from "~/lib/models";

export default interface QuizServiceInterface {
  generateQuizzes(): Promise<void>;

  getData(): Promise<{
    quizzesData: IQuiz[];
    currentIndexData: number;
    wrongQuizIndexNumbersData: number[];
    timeRateData: number;
  }>;

  setCurrentIndexData(number: number): Promise<void>;

  setWrongQuizIndexNumbersData(numbers: number[]): Promise<void>;
}
