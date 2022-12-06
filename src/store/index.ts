import { configureStore } from "@reduxjs/toolkit";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import quizReducer from "./quiz/slice";

export function useShallowSelector<T>(fn: (state: RootState) => T): T {
  return useSelector(fn, shallowEqual);
}

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type QuizDispatch = typeof store.dispatch;

export const useQuizDispatch = () => useDispatch<QuizDispatch>();

export default store;
