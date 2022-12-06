import { IQuiz } from "~/lib/models";
import reducer, { quizActions } from "../slice";
import { initialQuizState } from "../state";
import { QuizState } from "../types";

const mockQuizzes: IQuiz[] = [
  {
    category: "Celebrities",
    type: "multiple",
    difficulty: "medium",
    question: "Which American celebrity died in 1977 playing golf in La Moraleja, Madrid?",
    correct_answer: "Bing Crosby",
    incorrect_answers: ["Elvis Presley", "Charlie Chaplin", "Groucho Marx"],
  },
  {
    category: "Entertainment: Television",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which actor portrays &quot;Walter White&quot; in the series &quot;Breaking Bad&quot;?",
    correct_answer: " Bryan Cranston",
    incorrect_answers: ["Andrew Lincoln", "Aaron Paul", "RJ Mitte"],
  },
];

describe("quiz 리듀서 단위 테스트", () => {
  test("상태를 초기화한다.", () => {
    const prevState: QuizState = {
      quizzes: [...mockQuizzes],
      currentQuizIndex: 1,
      wrongQuizIndexNumbers: [],
    };

    expect(reducer(prevState, quizActions.init())).toEqual(initialQuizState);
  });
});

// test('should handle a todo being added to an empty list', () => {
//   const previousState: Todo[] = []

//   expect(reducer(previousState, todoAdded('Run the tests'))).toEqual([
//     { text: 'Run the tests', completed: false, id: 0 }
//   ])
// })

// test('should handle a todo being added to an existing list', () => {
//   const previousState: Todo[] = [
//     { text: 'Run the tests', completed: true, id: 0 }
//   ]

//   expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
//     { text: 'Run the tests', completed: true, id: 0 },
//     { text: 'Use Redux', completed: false, id: 1 }
//   ])
// })
