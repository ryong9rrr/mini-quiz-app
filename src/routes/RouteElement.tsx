import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import routePath from "./routePath";
import { PathName, QUIZ } from "./types";

interface RouteElementProps {
  pathName: PathName;
}

const RouteElement = ({ pathName }: RouteElementProps) => {
  const { metaTitle, pageElement } = routePath.getPageInfo(pathName);

  // TODO
  // 2번째 인자는 문제를 다 풀었는지 안 풀었는지에 대한 여부
  // 전역 상태로 바꿔줘야한다.
  if (!routePath.hasAuthorization(pathName, false)) {
    return (
      <>
        <Helmet title={metaTitle} />
        <h1>아직 퀴즈를 모두 풀지 않았어요!</h1>
        <NavLink to={routePath.getPathUrl(QUIZ)}>퀴즈 풀기</NavLink>
      </>
    );
  }

  return (
    <>
      <Helmet title={metaTitle} />
      {pageElement()}
    </>
  );
};

export default RouteElement;
