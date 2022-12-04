import React from "react";
import { Helmet } from "react-helmet";
import { ROUTE_PATHS } from "~/routes/paths";

const NotFoundPage = () => {
  return (
    <>
      <Helmet title={ROUTE_PATHS.NOT_FOUND.title} />
      <h1>404 Not Found</h1>
    </>
  );
};

export default NotFoundPage;
