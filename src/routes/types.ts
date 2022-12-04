export const HOME = "HOME" as const;
export const QUIZ = "QUIZ" as const;
export const CHECK_NOTE = "CHECK_NOTE" as const;
export const RESULT = "RESULT" as const;
export const NOT_FOUND = "NOT_FOUND" as const;

export type PathName =
  | typeof HOME
  | typeof QUIZ
  | typeof CHECK_NOTE
  | typeof RESULT
  | typeof NOT_FOUND;
