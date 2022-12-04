import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CheckNotePage, HomePage, NotFoundPage, QuizPage, ResultPage } from "~/pages";
import { ROUTE_PATHS } from "./paths";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.HOME.path} element={<HomePage />} />
        <Route path={ROUTE_PATHS.QUIZ.path} element={<QuizPage />} />
        <Route path={ROUTE_PATHS.RESULT.path} element={<ResultPage />} />
        <Route path={ROUTE_PATHS.CHECK_NOTE.path} element={<CheckNotePage />} />
        <Route path={ROUTE_PATHS.NOT_FOUND.path} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
