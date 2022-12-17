import { Api } from "../lib/core";
import { IQuiz, QuizType } from "../lib/models";

type ResponseData = {
  response_code: number;
  results: IQuiz[];
};

function makeQuery({ amount, type }: { amount: number; type: QuizType }) {
  return { amount, type };
}

class QuizApi extends Api {
  async getQuizzes(): Promise<ResponseData> {
    const query = makeQuery({ amount: 10, type: "multiple" });
    const response = await this.baseRequest.get("", {
      params: query,
    });
    if (response.data && response.data.response_code !== 0) {
      throw new Error("data is nothing. Probably url is wrong.");
    }
    return response.data;
  }
}

const quizApi = new QuizApi();

export default quizApi;
