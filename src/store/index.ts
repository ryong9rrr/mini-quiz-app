import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quiz/slice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type QuizDispatch = typeof store.dispatch;

export default store;
