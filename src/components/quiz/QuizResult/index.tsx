import React from "react";
import { NavLink } from "react-router-dom";

interface QuizResultProps {
  time: string;
  correctCount: number;
  inCorrectCount: number;
}

const QuizResult = ({ time, correctCount, inCorrectCount }: QuizResultProps) => {
  return (
    <>
      <h1>수고하셨습니다.</h1>
      <div>소요 시간 : {time}</div>
      <div>맞은 문제 {correctCount}개</div>
      <div>
        틀린 문제 : {inCorrectCount}개<NavLink to="/check-note">오답노트</NavLink>
      </div>
      <h2>차트</h2>
    </>
  );
};

export default QuizResult;
