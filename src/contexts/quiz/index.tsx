import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IQuiz, IWrongQuiz } from "~/lib/models";
import { initialQuizContext } from "./state";
import { QuizContextProps } from "./types";

const QuizContext = React.createContext(initialQuizContext);

export const useQuiz = () => useContext(QuizContext);

export const QuizContextProvider = ({ children, quizService }: QuizContextProps) => {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [wrongQuizIndexNumbers, setWrongQuizIndexNumbers] = useState<number[]>([]);
  const [timeRate, setTimeRate] = useState(0);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { quizzesData, currentIndexData, wrongQuizIndexNumbersData, timeRateData } =
      await quizService.getData();
    setQuizzes(quizzesData);
    setCurrentQuizIndex(currentIndexData);
    setWrongQuizIndexNumbers(wrongQuizIndexNumbersData);
    setTimeRate(timeRateData);
    setLoading(false);
  }, [quizService]);

  const createQuizzes = useCallback(async () => {
    await quizService.generateQuizzes();
    await fetchData();
  }, [quizService, fetchData]);

  const setWrongAnswers = useCallback(async () => {
    const nextWrongQuizIndexNumbers = [...wrongQuizIndexNumbers, currentQuizIndex].sort(
      (a, b) => a - b,
    );
    setWrongQuizIndexNumbers(nextWrongQuizIndexNumbers);
    await quizService.setWrongQuizIndexNumbersData(nextWrongQuizIndexNumbers);
  }, [currentQuizIndex, wrongQuizIndexNumbers, quizService]);

  const goNextQuiz = useCallback(
    async (selectedAnswer: string) => {
      if (!match(currentQuiz.quiz, selectedAnswer)) {
        setWrongAnswers();
      }
      const nextQuizIndex = currentQuiz.number;
      setCurrentQuizIndex(nextQuizIndex);
      await quizService.setCurrentIndexData(nextQuizIndex);
    },
    [currentQuiz, match, setWrongAnswers, quizService],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
      loading,
      timeRate,
      allQuizCount,
      isFinished,
      wrongQuizzes,
      quizCount,
      currentQuiz,
      createQuizzes,
      goNextQuiz,
      match,
    }),
    [
      loading,
      timeRate,
      allQuizCount,
      isFinished,
      wrongQuizzes,
      quizCount,
      currentQuiz,
      createQuizzes,
      goNextQuiz,
      match,
    ],
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};
