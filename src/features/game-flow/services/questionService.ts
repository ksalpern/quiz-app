import type { Question } from "@/types/question";
import questionsConfig from "@/config/questions.json";

class QuestionServiceError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "QuestionServiceError";
  }
}

class QuestionService {
  private validateQuestions(questions: Question[]): Question[] {
    if (!Array.isArray(questions)) {
      throw new QuestionServiceError(
        "Questions must be an array",
        "INVALID_QUESTIONS_FORMAT",
      );
    }

    return questions.map((question, index) => {
      if (
        !question.id ||
        !question.question ||
        !Array.isArray(question.options) ||
        !Array.isArray(question.correctAnswers)
      ) {
        throw new QuestionServiceError(
          `Question at index ${index} is missing required fields`,
          "MISSING_REQUIRED_FIELDS",
        );
      }

      if (question.correctAnswers.length === 0) {
        throw new QuestionServiceError(
          `Question ${question.id} has no correct answers`,
          "NO_CORRECT_ANSWERS",
        );
      }

      const invalidIndexes = question.correctAnswers.filter(
        (index: number) => index < 0 || index >= question.options.length,
      );

      if (invalidIndexes.length > 0) {
        throw new QuestionServiceError(
          `Question ${
            question.id
          } has invalid correct answer indexes: ${invalidIndexes.join(", ")}`,
          "INVALID_ANSWER_INDEXES",
        );
      }

      if (typeof question.prize !== "number" || question.prize < 0) {
        throw new QuestionServiceError(
          `Question ${question.id} has invalid prize: ${question.prize}`,
          "INVALID_PRIZE",
        );
      }

      return question as Question;
    });
  }

  getQuestions(): Question[] {
    try {
      return this.validateQuestions(questionsConfig.questions);
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error;
    }
  }

  getSteps() {
    try {
      const questions = this.getQuestions();
      return questions.map((q, index) => ({
        id: q.id,
        prize: q.prize,
        questionIndex: index,
      }));
    } catch (error) {
      console.error("Error loading steps:", error);
      throw error;
    }
  }

  checkAnswer(questionId: number, selectedAnswers: string[]): boolean {
    try {
      const question = questionsConfig.questions.find(
        (q) => q.id === questionId,
      );

      if (!question) {
        console.warn(`Question with id ${questionId} not found`);
        return false;
      }

      if (!Array.isArray(selectedAnswers) || selectedAnswers.length === 0) {
        console.warn("Invalid selected answers:", selectedAnswers);
        return false;
      }

      if (
        !Array.isArray(question.correctAnswers) ||
        question.correctAnswers.length === 0
      ) {
        console.warn(`Question ${questionId} has no correct answers`);
        return false;
      }

      const selectedIndexes = selectedAnswers.map((answer) =>
        question.options.indexOf(answer),
      );

      if (selectedIndexes.some((index) => index === -1)) {
        console.warn("Some selected answers not found in options");
        return false;
      }

      if (selectedIndexes.length !== question.correctAnswers.length) {
        return false;
      }

      return question.correctAnswers.every((correctIndex) =>
        selectedIndexes.includes(correctIndex),
      );
    } catch (error) {
      console.error("Error checking answer:", error);
      return false;
    }
  }

  getPrizeForQuestion(questionIndex: number): number {
    try {
      const questions = questionsConfig.questions;

      if (questionIndex < 0 || questionIndex >= questions.length) {
        console.warn(`Invalid question index: ${questionIndex}`);
        return 0;
      }

      const prize = questions[questionIndex]?.prize;

      if (typeof prize !== "number" || prize < 0) {
        console.warn(`Invalid prize for question ${questionIndex}: ${prize}`);
        return 0;
      }

      return prize;
    } catch (error) {
      console.error("Error getting prize:", error);
      return 0;
    }
  }
}

export const questionService = new QuestionService();
