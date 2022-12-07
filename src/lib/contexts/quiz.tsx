import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IQuiz } from "../models";

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

    window.sessionStorage.setItem("prev-quizzes", JSON.stringify(newQuizzes));
    window.sessionStorage.setItem("prev-currentQuizIndex", JSON.stringify(0));
    window.sessionStorage.setItem("prev-wrongQuizIndexNumbers", JSON.stringify([]));
  }, []);

  const goNextQuiz = useCallback(
    (isAnswered: boolean) => {
      if (!isAnswered) {
        const nextWrongQuizIndexNumbers = [...wrongQuizIndexNumbers, currentQuizIndex].sort(
          (a, b) => a - b,
        );
        setWrongQuizIndexNumbers(nextWrongQuizIndexNumbers);
        window.sessionStorage.setItem(
          "prev-wrongQuizIndexNumbers",
          JSON.stringify(nextWrongQuizIndexNumbers),
        );
      }
      const nextIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(nextIndex);
      window.sessionStorage.setItem("prev-currentQuizIndex", JSON.stringify(nextIndex));
    },
    [currentQuizIndex, wrongQuizIndexNumbers],
  );

  useEffect(() => {
    const prevQuizzesData = window.sessionStorage.getItem("prev-quizzes");
    const prevCurrentQuizIndexData = window.sessionStorage.getItem("prev-currentQuizIndex");
    const prevWrongQuizIndexNumbersData = window.sessionStorage.getItem(
      "prev-wrongQuizIndexNumbers",
    );

    setQuizzes(prevQuizzesData ? JSON.parse(prevQuizzesData) : []);
    setCurrentQuizIndex(prevCurrentQuizIndexData ? JSON.parse(prevCurrentQuizIndexData) : 0);
    setWrongQuizIndexNumbers(
      prevWrongQuizIndexNumbersData ? JSON.parse(prevWrongQuizIndexNumbersData) : [],
    );
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
