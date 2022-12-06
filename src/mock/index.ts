import { IQuiz } from "~/lib/models";

export const mockQuizzes: IQuiz[] = [
  {
    category: "History",
    type: "multiple",
    difficulty: "medium",
    question: "Which country had an &quot;Orange Revolution&quot; between 2004 and 2005?",
    correct_answer: "Ukraine",
    incorrect_answers: ["Belarus", "Latvia", "Lithuania"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "medium",
    question: "What is the Italian word for &quot;tomato&quot;?",
    correct_answer: "Pomodoro",
    incorrect_answers: ["Aglio", "Cipolla", "Peperoncino"],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "hard",
    question: "Which of the following languages does NOT use gender as a part of its grammar?",
    correct_answer: "Turkish",
    incorrect_answers: ["German", "Danish", "Polish"],
  },
];
