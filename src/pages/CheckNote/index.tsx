import React from "react";
import { Helmet } from "react-helmet";
import { ROUTE_PATHS } from "~/routes/paths";

const CheckNotePage = () => {
  return <Helmet title={ROUTE_PATHS.CHECK_NOTE.title} />;
};

export default CheckNotePage;
