// controllers/quizHistoryController.js
const QuizHistory = require('../models/quizHistory');

class QuizHistoryController {
  async getQuizHistory(userID) {
    try {
      return await QuizHistory.find({ userID });
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving quiz history');
    }
  }
  async createQuizHistory(userID, quizID, selectedAnswer) {
    try {
      const quizHistoryEntry = new QuizHistory({
        userID,
        quizID,
        selectedAnswer,
        timestamp: new Date(),
      });
      await quizHistoryEntry.save();
      return quizHistoryEntry;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating quiz history');
    }
  }
  async clearQuizHistory(userID) {
    try {
      // Remove all quiz history entries for the specified user
      const result = await QuizHistory.deleteMany({ userID });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Error clearing quiz history');
    }
  }

  // Add more controller methods as needed
}

module.exports = new QuizHistoryController();
