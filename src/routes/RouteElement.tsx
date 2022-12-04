import React from "react";
import { Helmet } from "react-helmet";
import { getPath } from "./routePath";
import { PathName } from "./types";

interface RouteElementProps {
  pathName: PathName;
}

const RouteElement = ({ pathName }: RouteElementProps) => {
  const { metaTitle, pageElement } = getPath(pathName);
  return (
    <>
      <Helmet title={metaTitle} />
      {pageElement()}
    </>
  );
};

export default RouteElement;
