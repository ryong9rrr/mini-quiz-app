import React from "react";
import { Helmet } from "react-helmet";
import { ROUTE_PATHS } from "~/routes/paths";

const HomePage = () => {
  return <Helmet title={ROUTE_PATHS.HOME.title} />;
};

export default HomePage;
