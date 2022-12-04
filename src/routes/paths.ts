type RoutePath = {
  path: string;
  title: string;
};

type PathName = "HOME" | "QUIZ" | "CHECK_NOTE" | "RESULT" | "NOT_FOUND";

type TitleMap = Record<PathName, string>;

export const TITLE_MAP = {
  HOME: "퀴즈 시작하기",
  QUIZ: "퀴즈 풀기",
  CHECK_NOTE: "오답노트",
  RESULT: "퀴즈 결과",
  NOT_FOUND: "404",
} as TitleMap;

const makeTitle = (title: string) => `${title} | Mini Quiz`;

const titleCoupler = (titleMap: TitleMap) => (pathName: PathName) => makeTitle(titleMap[pathName]);

const titleCreator = titleCoupler(TITLE_MAP);

export const ROUTE_PATHS = {
  HOME: {
    path: "/",
    title: titleCreator("HOME"),
  },
  QUIZ: {
    path: "/quiz",
    title: titleCreator("QUIZ"),
  },
  CHECK_NOTE: {
    path: "/check-note",
    title: titleCreator("CHECK_NOTE"),
  },
  RESULT: {
    path: "/result",
    title: titleCreator("RESULT"),
  },
  NOT_FOUND: {
    path: "*",
    title: titleCreator("NOT_FOUND"),
  },
} as Record<PathName, RoutePath>;
