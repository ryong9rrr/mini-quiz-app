import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IQuiz, IWrongQuiz } from "~/lib/models";
import { QuizStorage } from "~/modules/storage";
import { initialQuizContext } from "./state";

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

  const currentQuiz = useMemo(() => {
    const quiz = quizzes[currentQuizIndex] || null;
    const number = currentQuizIndex + 1;
    const isLast = currentQuizIndex + 1 === quizzes.length;
    return {
      quiz,
      number,
      isLast,
    };
  }, [quizzes, currentQuizIndex]);

  const match = useCallback((quiz: IQuiz | null, selectedAnswer: string | null) => {
    if (!quiz || !selectedAnswer) {
      return false;
    }
    return quiz.correct_answer === selectedAnswer;
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
    (selectedAnswer: string) => {
      if (!match(currentQuiz.quiz, selectedAnswer)) {
        setWrongAnswers();
      }
      const nextQuizIndex = currentQuiz.number;
      setCurrentQuizIndex(nextQuizIndex);
      if (hasStorage) {
        QuizStorage.setCurrentIndexData(nextQuizIndex);
      }
    },
    [currentQuiz, match, setWrongAnswers, hasStorage],
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
      currentQuiz,
      setNewQuizzes,
      goNextQuiz,
      match,
    }),
    [
      allQuizCount,
      isFinished,
      wrongQuizzes,
      quizCount,
      currentQuiz,
      setNewQuizzes,
      goNextQuiz,
      match,
    ],
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};
