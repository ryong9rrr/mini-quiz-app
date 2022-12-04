import { CheckNotePage, HomePage, NotFoundPage, QuizPage, ResultPage } from "~/pages";
import { CHECK_NOTE, HOME, NOT_FOUND, QUIZ, RESULT, PathName } from "./types";

const makeMetaTitle = (title: string) => `${title} | Mini Quiz`;

const ROUTE_PATH_MAP = {
  [HOME]: {
    pathUrl: "/",
    metaTitle: makeMetaTitle("퀴즈 시작하기"),
    pageElement: HomePage,
  },
  [QUIZ]: {
    pathUrl: "/quiz",
    metaTitle: makeMetaTitle("퀴즈 풀기"),
    pageElement: QuizPage,
  },
  [CHECK_NOTE]: {
    pathUrl: "/check-note",
    metaTitle: makeMetaTitle("오답노트"),
    pageElement: CheckNotePage,
  },
  [RESULT]: {
    pathUrl: "/result",
    metaTitle: makeMetaTitle("퀴즈 결과"),
    pageElement: ResultPage,
  },
  [NOT_FOUND]: {
    pathUrl: "*",
    metaTitle: makeMetaTitle("404"),
    pageElement: NotFoundPage,
  },
} as const;

export const getPathUrl = (pathName: PathName) => {
  return ROUTE_PATH_MAP[pathName].pathUrl;
};

export const getPath = (pathName: PathName) => {
  return ROUTE_PATH_MAP[pathName];
};
