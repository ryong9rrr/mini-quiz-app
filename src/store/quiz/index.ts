import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuiz } from "~/lib/models";

type QuizState = {
  quizzes: IQuiz[];
  currentQuizNumber: number;
  wrongQuizIndexNumbers: number[];
};

const initialQuizState: QuizState = {
  quizzes: [],
  currentQuizNumber: 1,
  wrongQuizIndexNumbers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialQuizState,
  reducers: {
    init() {
      return initialQuizState;
    },
    selectAnswer(state, action: PayloadAction<boolean>) {
      const isAnswered = action.payload;
      const currentQuizIndex = state.currentQuizNumber - 1;
      const existingWrongQuizIndex = state.wrongQuizIndexNumbers.findIndex(
        (indexNumber) => indexNumber === currentQuizIndex,
      );
      if (!isAnswered) {
        if (existingWrongQuizIndex > -1) {
          return;
        }
        state.wrongQuizIndexNumbers.push(currentQuizIndex);
        return;
      }
      if (existingWrongQuizIndex > -1) {
        state.wrongQuizIndexNumbers.slice(existingWrongQuizIndex, 1);
      }
    },
    gePrevQuiz(state) {
      if (state.currentQuizNumber > 1) {
        state.currentQuizNumber -= 1;
      }
      state.currentQuizNumber = 1;
    },
    goNextQuiz(state) {
      if (state.currentQuizNumber < state.quizzes.length) {
        state.currentQuizNumber += 1;
      }
      state.currentQuizNumber = state.quizzes.length;
    },
  },
});

export const quizActions = quizSlice.actions;

export default quizSlice.reducer;
