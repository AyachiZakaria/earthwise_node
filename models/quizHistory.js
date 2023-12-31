// quizHistorySchema.js
const mongoose = require('mongoose');

const quizHistorySchema = new mongoose.Schema({
  userID: { type: String, required: true },
  quizID: { type: String, required: true },
  selectedAnswer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Add more fields as needed
});

const QuizHistory = mongoose.model('QuizHistory', quizHistorySchema);

module.exports = QuizHistory;
