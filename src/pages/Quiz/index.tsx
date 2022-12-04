import React from "react";
import { Helmet } from "react-helmet";
import { ROUTE_PATHS } from "~/routes/paths";

const QuizPage = () => {
  return <Helmet title={ROUTE_PATHS.QUIZ.title} />;
};

export default QuizPage;
