export const ROUTE_PATHS = {
  HOME: "/",
  QUIZ: "/quiz",
  RESULT: "/result",
  CHECK_NOTE: "/check-note",
} as const;

export const PAGE_TITLE = {
  [ROUTE_PATHS.HOME]: "홈 | Mini-Quiz",
  [ROUTE_PATHS.QUIZ]: "퀴즈 | Mini-Quiz",
  [ROUTE_PATHS.RESULT]: "퀴즈 결과 | Mini-Quiz",
  [ROUTE_PATHS.CHECK_NOTE]: "오답 노트 | Mini-Quiz",
} as const;
