import { useCallback, useMemo } from "react";
import { IQuiz } from "~/lib/models";
import { useQuizDispatch, useShallowSelector } from ".";
import { quizActions } from "./quiz/slice";

const useQuiz = () => {
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
    return quizState.wrongQuizIndexNumbers
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

  const setQuizzes = useCallback(
    (newQuizzes: IQuiz[]) => {
      dispatch(quizActions.setQuizzes(newQuizzes));
    },
    [dispatch],
  );

  const selectAnswer = useCallback(
    (isAnswered: boolean) => {
      dispatch(quizActions.selectAnswer(isAnswered));
    },
    [dispatch],
  );

  const goPrevQuiz = useCallback(() => {
    dispatch(quizActions.goPrevQuiz());
  }, [dispatch]);

  const goNextQuiz = useCallback(() => {
    dispatch(quizActions.goNextQuiz());
  }, [dispatch]);

  return {
    ...quizState,
    isFinished,
    wrongQuizzesCount,
    correctQuizzesCount,
    wrongQuizzes,
    isCorrect,
    setQuizzes,
    selectAnswer,
    goPrevQuiz,
    goNextQuiz,
  };
};

export default useQuiz;
