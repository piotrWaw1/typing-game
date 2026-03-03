export type SaveAttemptAction = (correct: number, incorrect: number) => Promise<{ message: string; success: boolean }>;
