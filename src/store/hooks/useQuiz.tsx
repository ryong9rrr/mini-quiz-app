import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { IQuiz } from "~/lib/models";
import { QuizDispatch } from "..";
import { quizActions, QuizState } from "../quiz";
import { IQuizStorage } from "../storage/quizStorage";
import { useShallowSelector } from "../utils";

const useQuizDispatch = () => useDispatch<QuizDispatch>();

const useQuiz = (storage?: IQuizStorage) => {
  const quizState = useShallowSelector((state) => state.quiz);
  const dispatch = useQuizDispatch();

  const isFinished = useMemo(
    () => quizState.currentQuizIndex >= quizState.quizzes.length,
    [quizState.currentQuizIndex, quizState.quizzes],
  );

  const wrongQuizzesCount = useMemo(() => {
    return quizState.wrongQuizIndexNumbers.length;
  }, [quizState.wrongQuizIndexNumbers]);

  const correctQuizzesCount = useMemo(() => {
    return quizState.quizzes.length - wrongQuizzesCount;
  }, [quizState.quizzes, wrongQuizzesCount]);

  const wrongQuizzes = useMemo(() => {
    return [...quizState.wrongQuizIndexNumbers]
      .sort((a, b) => a - b)
      .map((indexNumber) => quizState.quizzes[indexNumber]);
  }, [quizState.wrongQuizIndexNumbers, quizState.quizzes]);

  const isCorrect = useCallback(
    (selectedAnswer: string) => {
      const currentQuiz = quizState.quizzes[quizState.currentQuizIndex];
      return currentQuiz.correct_answer === selectedAnswer;
    },
    [quizState.quizzes, quizState.currentQuizIndex],
  );

  const preFetch = useCallback(
    (prevState: QuizState | null) => {
      dispatch(quizActions.preFetch(prevState));
      storage?.setData(quizState);
    },
    [dispatch, storage, quizState],
  );

  const setNewQuizzes = useCallback(
    (newQuizzes: IQuiz[]) => {
      dispatch(quizActions.setNewQuizzes(newQuizzes));
      storage?.setData(quizState);
    },
    [dispatch, storage, quizState],
  );

  const selectAnswer = useCallback(
    (isAnswered: boolean) => {
      dispatch(quizActions.selectAnswer(isAnswered));
      storage?.setData(quizState);
    },
    [dispatch, storage, quizState],
  );

  const goPrevQuiz = useCallback(() => {
    dispatch(quizActions.goPrevQuiz());
    storage?.setData(quizState);
  }, [dispatch, storage, quizState]);

  const goNextQuiz = useCallback(() => {
    dispatch(quizActions.goNextQuiz());
    storage?.setData(quizState);
  }, [dispatch, storage, quizState]);

  useEffect(() => {
    if (!storage) {
      return;
    }
    const prevState = storage.getData();
    if (prevState) {
      preFetch(prevState);
    }
  }, [preFetch, storage]);

  return {
    ...quizState,
    isFinished,
    wrongQuizzesCount,
    correctQuizzesCount,
    wrongQuizzes,
    preFetch,
    isCorrect,
    setNewQuizzes,
    selectAnswer,
    goPrevQuiz,
    goNextQuiz,
  };
};

export default useQuiz;
