import React from "react";
import { Route, Routes } from "react-router-dom";
import { CheckNotePage, HomePage, NotFoundPage, QuizPage, ResultPage } from "~/pages";
import { ROUTE_PATHS } from "./paths";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
      <Route path={ROUTE_PATHS.QUIZ} element={<QuizPage />} />
      <Route path={ROUTE_PATHS.RESULT} element={<ResultPage />} />
      <Route path={ROUTE_PATHS.CHECK_NOTE} element={<CheckNotePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
