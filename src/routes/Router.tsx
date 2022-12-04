import React from "react";
import { Route, Routes } from "react-router-dom";
import RouteElement from "./RouteElement";
import { CHECK_NOTE, HOME, NOT_FOUND, QUIZ, RESULT } from "./types";
import routePath from "./routePath";

const Router = () => {
  return (
    <Routes>
      <Route path={routePath.getPathUrl(HOME)} element={<RouteElement pathName={HOME} />} />
      <Route path={routePath.getPathUrl(QUIZ)} element={<RouteElement pathName={QUIZ} />} />
      <Route path={routePath.getPathUrl(RESULT)} element={<RouteElement pathName={RESULT} />} />
      <Route
        path={routePath.getPathUrl(CHECK_NOTE)}
        element={<RouteElement pathName={CHECK_NOTE} />}
      />
      <Route
        path={routePath.getPathUrl(NOT_FOUND)}
        element={<RouteElement pathName={NOT_FOUND} />}
      />
    </Routes>
  );
};

export default Router;
