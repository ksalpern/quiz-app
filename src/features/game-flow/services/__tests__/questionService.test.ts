import { questionService } from "../questionService";
import type { Question } from "@/types/question";

interface QuestionServiceWithPrivateMethods {
  validateQuestions(questions: Question[]): Question[];
}

const serviceWithPrivate =
  questionService as unknown as QuestionServiceWithPrivateMethods;

describe("QuestionService", () => {
  describe("validateQuestions", () => {
    it("should validate correct questions structure", () => {
      const validQuestions: Question[] = [
        {
          id: 1,
          prize: 500,
          question: "Test question?",
          options: ["A", "B", "C", "D"],
          correctAnswers: [0],
        },
      ];

      const result = serviceWithPrivate.validateQuestions(validQuestions);
      expect(result).toEqual(validQuestions);
    });

    it("should throw error for invalid questions", () => {
      expect(() => {
        serviceWithPrivate.validateQuestions(
          "not an array" as unknown as Question[],
        );
      }).toThrow("Questions must be an array");

      expect(() => {
        serviceWithPrivate.validateQuestions([
          {
            id: 1,
            prize: -100,
            question: "Test?",
            options: ["A", "B"],
            correctAnswers: [5], // invalid index
          },
        ]);
      }).toThrow();
    });
  });

  describe("getQuestions", () => {
    it("should return questions from config", () => {
      const questions = questionService.getQuestions();

      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBe(12);
      expect(questions[0]).toHaveProperty("id");
      expect(questions[0]).toHaveProperty("prize");
      expect(questions[0]).toHaveProperty("question");
      expect(questions[0]).toHaveProperty("options");
      expect(questions[0]).toHaveProperty("correctAnswers");
    });
  });

  describe("getSteps", () => {
    it("should return steps with correct structure", () => {
      const steps = questionService.getSteps();

      expect(Array.isArray(steps)).toBe(true);
      expect(steps.length).toBe(12);
      expect(steps[0]).toEqual({
        id: 1,
        prize: 500,
        questionIndex: 0,
      });
    });
  });

  describe("checkAnswer", () => {
    it("should return true for correct answers", () => {
      expect(questionService.checkAnswer(1, ["Kyiv"])).toBe(true);
      expect(
        questionService.checkAnswer(9, ["Sumy", "Cherkasy", "Vinnytsia"]),
      ).toBe(true);
    });

    it("should return false for incorrect answers", () => {
      expect(questionService.checkAnswer(1, ["Lviv"])).toBe(false);
      expect(questionService.checkAnswer(999, ["Kyiv"])).toBe(false);
      expect(questionService.checkAnswer(1, [])).toBe(false);
    });
  });

  describe("getPrizeForQuestion", () => {
    it("should return correct prizes", () => {
      expect(questionService.getPrizeForQuestion(0)).toBe(500);
      expect(questionService.getPrizeForQuestion(11)).toBe(1000000);
      expect(questionService.getPrizeForQuestion(-1)).toBe(0);
      expect(questionService.getPrizeForQuestion(999)).toBe(0);
    });
  });
});
