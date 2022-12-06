import { configureStore } from "@reduxjs/toolkit";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import quizReducer from "./quiz";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

type QuizDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useQuizDispatch = () => useDispatch<QuizDispatch>();

export function useShallowSelector<T>(fn: (state: RootState) => T): T {
  return useSelector(fn, shallowEqual);
}

export default store;
