import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IQuiz, IWrongQuiz } from "../../lib/models";
import { QuizStorage } from "../storage";

interface IQuizContext {
  allQuizCount: number;
  isFinished: boolean;
  wrongQuizzes: IWrongQuiz[];
  quizCount: {
    inCorrect: number;
    correct: number;
  };
  currectQuiz: {
    number: number;
    quiz: IQuiz | null;
    isLast: boolean;
  };
  setNewQuizzes: (newQuizzes: IQuiz[]) => void;
  goNextQuiz: (isAnswered: boolean) => void;
  isCorrect: (currentQuiz: IQuiz, selectedAnswer: string) => boolean;
}

const initialQuizContext: IQuizContext = {
  allQuizCount: 0,
  isFinished: false,
  wrongQuizzes: [],
  quizCount: {
    inCorrect: 0,
    correct: 0,
  },
  currectQuiz: {
    number: 0,
    quiz: null,
    isLast: false,
  },
  // eslint-disable-next-line
  setNewQuizzes(newQuizzes: IQuiz[]) {
    return;
  },
  // eslint-disable-next-line
  goNextQuiz(isAnswered: boolean) {
    return;
  },
  isCorrect(currentQuiz: IQuiz, selectedAnswer: string) {
    return false;
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
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [wrongQuizIndexNumbers, setWrongQuizIndexNumbers] = useState<number[]>([]);

  const allQuizCount = useMemo(() => {
    return quizzes.length;
  }, [quizzes]);

  const wrongQuizzes: IWrongQuiz[] = useMemo(() => {
    return wrongQuizIndexNumbers.map((indexNumber) => ({
      quizNumber: indexNumber + 1,
      quiz: quizzes[indexNumber],
    }));
  }, [quizzes, wrongQuizIndexNumbers]);

  const quizCount = useMemo(() => {
    const inCorrect = wrongQuizzes.length;
    return {
      inCorrect,
      correct: quizzes.length - inCorrect,
    };
  }, [quizzes, wrongQuizzes]);

  const isFinished = useMemo(() => {
    return quizzes.length > 0 && currentQuizIndex >= quizzes.length;
  }, [currentQuizIndex, quizzes]);

  const currectQuiz = useMemo(() => {
    const quiz = quizzes[currentQuizIndex] || null;
    const number = currentQuizIndex + 1;
    const isLast = currentQuizIndex + 1 === quizzes.length;
    return {
      quiz,
      number,
      isLast,
    };
  }, [quizzes, currentQuizIndex]);

  const isCorrect = useCallback((currentQuiz: IQuiz, selectedAnswer: string) => {
    return currentQuiz.correct_answer === selectedAnswer;
  }, []);

  const setNewQuizzes = useCallback(
    (newQuizzes: IQuiz[]) => {
      setQuizzes(newQuizzes);
      setCurrentQuizIndex(0);
      setWrongQuizIndexNumbers([]);

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
      allQuizCount,
      isFinished,
      wrongQuizzes,
      quizCount,
      currectQuiz,
      setNewQuizzes,
      goNextQuiz,
      isCorrect,
    }),
    [
      allQuizCount,
      isFinished,
      wrongQuizzes,
      quizCount,
      currectQuiz,
      setNewQuizzes,
      goNextQuiz,
      isCorrect,
    ],
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};
