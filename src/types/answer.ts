export type AnswerState = "correct" | "wrong" | "selected" | "";

export type Answer = {
  questionId: number;
  selectedOptions: string[];
  isCorrect: boolean;
  timestamp: number;
};
