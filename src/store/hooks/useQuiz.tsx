import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { IQuiz } from "~/lib/models";
import { QuizDispatch } from "..";
import { quizActions, QuizState } from "../quiz";
import quizStorage from "../storage/quizStorage";
import { useShallowSelector } from "../utils";

const useQuizDispatch = () => useDispatch<QuizDispatch>();

const useQuiz = (storage = quizStorage) => {
  const quizState = useShallowSelector((state) => state.quiz);
  const dispatch = useQuizDispatch();

  const isFinished = useMemo(
    () => quizState.quizzes.length > 0 && quizState.currentQuizIndex >= quizState.quizzes.length,
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

  const currentQuiz = useMemo(() => {
    if (quizState.quizzes.length === 0) {
      return null;
    }
    return quizState.quizzes[quizState.currentQuizIndex];
  }, [quizState.quizzes, quizState.currentQuizIndex]);

  const isCorrect = useCallback(
    (selectedAnswer: string) => {
      return currentQuiz && currentQuiz.correct_answer === selectedAnswer;
    },
    // eslint-disable-next-line
    [],
  );

  const preFetch = useCallback(
    (prevState: QuizState | null) => {
      dispatch(quizActions.preFetch(prevState));
      storage.setData(quizState);
    },
    // eslint-disable-next-line
    [],
  );

  const setNewQuizzes = useCallback(
    (newQuizzes: IQuiz[]) => {
      dispatch(quizActions.setNewQuizzes(newQuizzes));
      storage.setData(quizState);
    },
    // eslint-disable-next-line
    [],
  );

  const selectAnswer = useCallback(
    (isAnswered: boolean) => {
      dispatch(quizActions.selectAnswer(isAnswered));
      storage.setData(quizState);
    },
    // eslint-disable-next-line
    [],
  );

  const goPrevQuiz = useCallback(() => {
    dispatch(quizActions.goPrevQuiz());
    storage.setData(quizState);
    // eslint-disable-next-line
  }, []);

  const goNextQuiz = useCallback(() => {
    dispatch(quizActions.goNextQuiz());
    storage.setData(quizState);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const prevState = storage.getData();
    if (prevState) {
      preFetch(prevState);
    }
    // eslint-disable-next-line
  }, []);

  return {
    ...quizState,
    isFinished,
    wrongQuizzesCount,
    correctQuizzesCount,
    wrongQuizzes,
    currentQuiz,
    preFetch,
    isCorrect,
    setNewQuizzes,
    selectAnswer,
    goPrevQuiz,
    goNextQuiz,
  };
};

export default useQuiz;
