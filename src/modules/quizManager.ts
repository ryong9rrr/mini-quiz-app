import { IQuiz, IWrongQuiz } from "~/lib/models";

export const isFinished = (quizzesCount: number, currentQuizIndex: number) => {
  return quizzesCount > 0 && currentQuizIndex >= quizzesCount;
};

export const isCorrect = (currentQuiz: IQuiz, selectedAnswer: string) => {
  return currentQuiz.correct_answer === selectedAnswer;
};

export const getWrongQuizzes = (
  wrongQuizIndexNumbers: number[],
  quizzes: IQuiz[],
): IWrongQuiz[] => {
  return wrongQuizIndexNumbers.map((indexNumber) => ({
    quizNumber: indexNumber + 1,
    quiz: quizzes[indexNumber],
  }));
};
