import React from "react";
import { NavLink } from "react-router-dom";

type Time = {
  hour: number;
  min: number;
  sec: number;
};

interface QuizResultProps {
  time: Time;
  correctCount: number;
  inCorrectCount: number;
}

const QuizResult = ({ time, correctCount, inCorrectCount }: QuizResultProps) => {
  const { hour, min, sec } = time;
  return (
    <>
      <div>
        소요 시간 : {hour} 시간 {min} 분 {sec}초
      </div>
      <div>맞은 문제 {correctCount}개</div>
      <div>
        틀린 문제 : {inCorrectCount}개<NavLink to="/check-note">오답노트</NavLink>
      </div>
      <h2>차트</h2>
    </>
  );
};

export default QuizResult;
