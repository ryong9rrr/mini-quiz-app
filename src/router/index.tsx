import React from "react";
import { Route, Routes } from "react-router-dom";
import { CheckNotePage, HomePage, NotFoundPage, QuizPage, ResultPage } from "~/pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/check-note" element={<CheckNotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
