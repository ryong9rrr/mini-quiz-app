import React from "react";
import { IQuiz } from "~/lib/models";

interface CheckNoteProps {
  wrongQuizzes: IQuiz[];
}

const CheckNote = ({ wrongQuizzes }: CheckNoteProps) => {
  return (
    <ul>
      {wrongQuizzes.map((quiz) => (
        <li key={quiz.question}>{quiz.question}</li>
      ))}
    </ul>
  );
};

export default CheckNote;
