import { IQuiz } from "~/lib/models";

export default class QuizManager {
  static isFinished(quizzesCount: number, currentQuizIndex: number) {
    return quizzesCount > 0 && currentQuizIndex >= quizzesCount;
  }

  static isCorrect(currentQuiz: IQuiz, selectedAnswer: string) {
    return currentQuiz.correct_answer === selectedAnswer;
  }

  static getWrongQuizzes(wrongQuizIndexNumbers: number[], quizzes: IQuiz[]) {
    return wrongQuizIndexNumbers.map((indexNumber) => quizzes[indexNumber]);
  }
}
