import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuiz } from "~/lib/models";
import { initialQuizState } from "./state";

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialQuizState,
  reducers: {
    setNewQuizzes(state, { payload: newQuizzes }: PayloadAction<IQuiz[]>) {
      return { ...initialQuizState, quizzes: newQuizzes };
    },
    selectAnswer(state, { payload: isAnswered }: PayloadAction<boolean>) {
      const existingWrongQuizIndex = state.wrongQuizIndexNumbers.findIndex(
        (indexNumber) => indexNumber === state.currentQuizIndex,
      );
      if (!isAnswered) {
        if (existingWrongQuizIndex > -1) {
          return;
        }
        state.wrongQuizIndexNumbers.push(state.currentQuizIndex);
        return;
      }
      if (existingWrongQuizIndex > -1) {
        state.wrongQuizIndexNumbers.splice(existingWrongQuizIndex, 1);
      }
    },
    goPrevQuiz(state) {
      if (state.currentQuizIndex > 0) {
        state.currentQuizIndex -= 1;
        return;
      }
      state.currentQuizIndex = 0;
    },
    goNextQuiz(state) {
      if (state.currentQuizIndex < state.quizzes.length) {
        state.currentQuizIndex += 1;
        return;
      }
      state.currentQuizIndex = state.quizzes.length;
    },
  },
});

export const quizActions = quizSlice.actions;

export default quizSlice.reducer;
