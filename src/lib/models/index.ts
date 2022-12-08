export type QuizType = "multiple";

export type IQuiz = {
  category: string;
  type: QuizType;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: [string, string, string];
};

export type IWrongQuiz = {
  quizNumber: number;
  quiz: IQuiz;
};
