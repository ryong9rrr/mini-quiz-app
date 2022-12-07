export default class QuizManager {
  static isFinished(quizzesCount: number, currentQuizIndex: number) {
    return quizzesCount > 0 && currentQuizIndex >= quizzesCount;
  }
}
