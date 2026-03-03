export type SaveRoundAction = (
  correct: number,
  incorrect: number,
  sentence: string,
) => Promise<{ message: string; success: boolean }>;
