import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteElement from "./RouteElement";
import { CHECK_NOTE, HOME, NOT_FOUND, QUIZ, RESULT } from "./types";
import { getPathUrl } from "./routePath";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={getPathUrl(HOME)} element={<RouteElement pathName={HOME} />} />
        <Route path={getPathUrl(QUIZ)} element={<RouteElement pathName={QUIZ} />} />
        <Route path={getPathUrl(RESULT)} element={<RouteElement pathName={RESULT} />} />
        <Route path={getPathUrl(CHECK_NOTE)} element={<RouteElement pathName={CHECK_NOTE} />} />
        <Route path={getPathUrl(NOT_FOUND)} element={<RouteElement pathName={NOT_FOUND} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
