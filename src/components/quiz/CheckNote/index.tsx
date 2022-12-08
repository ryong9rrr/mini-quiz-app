import React from "react";
import { IWrongQuiz } from "~/lib/models";

interface CheckNoteProps {
  wrongQuizzes: IWrongQuiz[];
}

const CheckNote = ({ wrongQuizzes }: CheckNoteProps) => {
  return (
    <ul>
      {wrongQuizzes.map((wrongQuiz) => (
        <li key={wrongQuiz.quizNumber}>
          <h3>{wrongQuiz.quiz.question}</h3>
          <span>정답 : {wrongQuiz.quiz.correct_answer}</span>
          <div>
            {wrongQuiz.quiz.incorrect_answers.map((incorrectAnswer) => (
              <div key={incorrectAnswer}>{incorrectAnswer}</div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CheckNote;
