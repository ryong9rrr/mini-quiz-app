import React from "react";
import { Helmet } from "react-helmet";
import { ROUTE_PATHS } from "~/routes/paths";

const ResultPage = () => {
  return <Helmet title={ROUTE_PATHS.RESULT.title} />;
};

export default ResultPage;
