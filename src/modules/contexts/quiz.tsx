import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IQuiz } from "../../lib/models";
import QuizStorage from "../storage/quizSesstionStorage";

interface IQuizContext {
  startTime: number;
  quizzes: IQuiz[];
  currentQuizIndex: number;
  wrongQuizIndexNumbers: number[];
  setNewQuizzes: (newQuizzes: IQuiz[]) => void;
  goNextQuiz: (isAnswered: boolean) => void;
}

const initialQuizContext: IQuizContext = {
  startTime: Date.now(),
  quizzes: [],
  currentQuizIndex: 0,
  wrongQuizIndexNumbers: [],
  // eslint-disable-next-line
  setNewQuizzes(newQuizzes: IQuiz[]) {
    return;
  },
  // eslint-disable-next-line
  goNextQuiz(isAnswered: boolean) {
    return;
  },
};

const QuizContext = React.createContext(initialQuizContext);

export const useQuiz = () => useContext(QuizContext);

export const QuizContextProvider = ({
  children,
  hasStorage = true,
}: {
  children: React.ReactNode;
  hasStorage?: boolean;
}) => {
  const [startTime, setStartTime] = useState(Date.now());
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [wrongQuizIndexNumbers, setWrongQuizIndexNumbers] = useState<number[]>([]);

  const setNewQuizzes = useCallback(
    (newQuizzes: IQuiz[]) => {
      setQuizzes(newQuizzes);
      setCurrentQuizIndex(0);
      setWrongQuizIndexNumbers([]);
      setStartTime(Date.now());

      if (hasStorage) {
        QuizStorage.setQuizzesData(newQuizzes);
        QuizStorage.setCurrentIndexData(0);
        QuizStorage.setWrongQuizIndexNumbersData([]);
      }
    },
    [hasStorage],
  );

  const setWrongAnswers = useCallback(() => {
    const nextWrongQuizIndexNumbers = [...wrongQuizIndexNumbers, currentQuizIndex].sort(
      (a, b) => a - b,
    );
    setWrongQuizIndexNumbers(nextWrongQuizIndexNumbers);
    if (hasStorage) {
      QuizStorage.setWrongQuizIndexNumbersData(nextWrongQuizIndexNumbers);
    }
  }, [currentQuizIndex, wrongQuizIndexNumbers, hasStorage]);

  const goNextQuiz = useCallback(
    (isAnswered: boolean) => {
      if (!isAnswered) {
        setWrongAnswers();
      }
      const nextIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(nextIndex);
      if (hasStorage) {
        QuizStorage.setCurrentIndexData(nextIndex);
      }
    },
    [currentQuizIndex, setWrongAnswers, hasStorage],
  );

  useEffect(() => {
    if (hasStorage) {
      setQuizzes(QuizStorage.getQuizzesData());
      setCurrentQuizIndex(QuizStorage.getCurrentIndexData());
      setWrongQuizIndexNumbers(QuizStorage.getWrongQuizIndexNumbersData());
    }
  }, [hasStorage]);

  const contextValue = useMemo(
    () => ({
      startTime,
      quizzes,
      currentQuizIndex,
      wrongQuizIndexNumbers,
      setNewQuizzes,
      goNextQuiz,
    }),
    [startTime, quizzes, currentQuizIndex, wrongQuizIndexNumbers, setNewQuizzes, goNextQuiz],
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};
