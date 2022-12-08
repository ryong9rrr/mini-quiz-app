import React from "react";
import { IQuiz } from "~/lib/models";

interface CheckNoteProps {
  wrongQuizzes: IQuiz[];
}

const CheckNote = ({ wrongQuizzes }: CheckNoteProps) => {
  return (
    <ul>
      {wrongQuizzes.map((quiz) => (
        <li key={quiz.question}>
          <h3>{quiz.question}</h3>
          <span>정답 : {quiz.correct_answer}</span>
          <div>
            {quiz.incorrect_answers.map((incorrectAnswer) => (
              <div key={incorrectAnswer}>{incorrectAnswer}</div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CheckNote;
