import { CheckNotePage, HomePage, NotFoundPage, QuizPage, ResultPage } from "~/pages";
import { CHECK_NOTE, HOME, NOT_FOUND, QUIZ, RESULT, PathName } from "./types";

const makeMetaTitle = (title: string) => `${title} | Mini Quiz`;

const ROUTE_PATH_MAP = {
  [HOME]: {
    pathUrl: "/",
    metaTitle: makeMetaTitle("퀴즈 시작하기"),
    pageElement: HomePage,
    isProtected: false,
  },
  [QUIZ]: {
    pathUrl: "/quiz",
    metaTitle: makeMetaTitle("퀴즈 풀기"),
    pageElement: QuizPage,
    isProtected: false,
  },
  [CHECK_NOTE]: {
    pathUrl: "/check-note",
    metaTitle: makeMetaTitle("오답노트"),
    pageElement: CheckNotePage,
    isProtected: true,
  },
  [RESULT]: {
    pathUrl: "/result",
    metaTitle: makeMetaTitle("퀴즈 결과"),
    pageElement: ResultPage,
    isProtected: true,
  },
  [NOT_FOUND]: {
    pathUrl: "*",
    metaTitle: makeMetaTitle("404"),
    pageElement: NotFoundPage,
    isProtected: false,
  },
} as const;

class RoutePath {
  private routePathMap = ROUTE_PATH_MAP;

  getPathUrl(pathName: PathName) {
    return this.routePathMap[pathName].pathUrl;
  }

  getPageInfo(pathName: PathName) {
    const { metaTitle, pageElement } = this.routePathMap[pathName];
    return { metaTitle, pageElement };
  }

  hasAuthorization(pathName: PathName, isAuth: boolean) {
    const { isProtected } = this.routePathMap[pathName];
    return isProtected ? isProtected && isAuth : true;
  }
}

const routePath = new RoutePath();

export default routePath;
