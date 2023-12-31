const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: String,
  type: String,
  difficulty: String,
  question: String,
  correct_answer: String,
  incorrect_answers: [String],
  hidden: {
    type: Boolean,
    default: false,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;