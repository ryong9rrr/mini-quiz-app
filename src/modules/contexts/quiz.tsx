import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IQuiz } from "../../lib/models";
import quizStorage from "../storage/quizSesstionStorage";

interface IQuizContext {
  quizzes: IQuiz[];
  currentQuizIndex: number;
  wrongQuizIndexNumbers: number[];
  setNewQuizzes: (newQuizzes: IQuiz[]) => void;
  goNextQuiz: (isAnswered: boolean) => void;
}

const initialQuizContext: IQuizContext = {
  quizzes: [],
  currentQuizIndex: 0,
  wrongQuizIndexNumbers: [],
  setNewQuizzes(newQuizzes: IQuiz[]) {
    return;
  },
  goNextQuiz(isAnswered: boolean) {
    return;
  },
};

const QuizContext = React.createContext(initialQuizContext);

export const useQuiz = () => useContext(QuizContext);

export const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [wrongQuizIndexNumbers, setWrongQuizIndexNumbers] = useState<number[]>([]);

  const setNewQuizzes = useCallback((newQuizzes: IQuiz[]) => {
    setQuizzes(newQuizzes);
    setCurrentQuizIndex(0);
    setWrongQuizIndexNumbers([]);

    quizStorage.setQuizzesData(newQuizzes);
    quizStorage.setCurrentIndexData(0);
    quizStorage.setWrongQuizIndexNumbersData([]);
  }, []);

  const setWrongAnswers = useCallback(() => {
    const nextWrongQuizIndexNumbers = [...wrongQuizIndexNumbers, currentQuizIndex].sort(
      (a, b) => a - b,
    );
    setWrongQuizIndexNumbers(nextWrongQuizIndexNumbers);
    quizStorage.setWrongQuizIndexNumbersData(nextWrongQuizIndexNumbers);
  }, [currentQuizIndex, wrongQuizIndexNumbers]);

  const goNextQuiz = useCallback(
    (isAnswered: boolean) => {
      if (!isAnswered) {
        setWrongAnswers();
      }
      const nextIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(nextIndex);
      quizStorage.setCurrentIndexData(nextIndex);
    },
    [currentQuizIndex, setWrongAnswers],
  );

  useEffect(() => {
    setQuizzes(quizStorage.getQuizzesData());
    setCurrentQuizIndex(quizStorage.getCurrentIndexData());
    setWrongQuizIndexNumbers(quizStorage.getWrongQuizIndexNumbersData());
  }, []);

  const contextValue = useMemo(
    () => ({
      quizzes,
      currentQuizIndex,
      wrongQuizIndexNumbers,
      setNewQuizzes,
      goNextQuiz,
    }),
    [quizzes, currentQuizIndex, wrongQuizIndexNumbers, setNewQuizzes, goNextQuiz],
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};
