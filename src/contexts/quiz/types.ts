import React from "react";
import { QuizServiceInterface } from "~/interfaces";
import { IQuiz, IWrongQuiz } from "~/lib/models";

export type QuizCount = {
  inCorrect: number;
  correct: number;
};

export type CurrentQuiz = {
  number: number;
  quiz: IQuiz | null;
  isLast: boolean;
};

export interface QuizContextProps {
  children: React.ReactNode;
  quizService: QuizServiceInterface;
}

export interface QuizContextValue {
  loading: boolean;
  allQuizCount: number;
  isFinished: boolean;
  wrongQuizzes: IWrongQuiz[];
  quizCount: QuizCount;
  currentQuiz: CurrentQuiz;
  timeRate: number;
  match: (quiz: IQuiz | null, selectedAnswer: string | null) => boolean;
  createQuizzes: () => void;
  goNextQuiz: (selectedAnswer: string) => void;
}
