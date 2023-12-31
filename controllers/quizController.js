const Quiz = require('../models/quizModel');

exports.createQuiz = async (req, res) => {
  try {
    const quizData = req.body;
    console.log(quizData);
    const quiz = new Quiz(quizData);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    console.log(Quiz.id);
    console.log(Quiz.quizId);
    res.send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getQuizzesByDifficulty = async (req, res) => {
  try {
    const difficulty = req.params.difficulty; // Assuming the difficulty is passed as a request parameter
    const quizzes = await Quiz.find({ difficulty: difficulty }); // Query the database for quizzes with the specified difficulty
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getNumberOfQuizzes = async (req, res) => {
  try {
    const numberOfQuizzes = parseInt(req.params.number);

    // Validate that numberOfQuizzes is a positive integer
    if (isNaN(numberOfQuizzes) || numberOfQuizzes <= 0) {
      return res.status(400).json({ error: 'Invalid number of quizzes' });
    }

    // Get the specified number of quizzes
    const quizzes = await Quiz.find().limit(numberOfQuizzes);

    // Respond with the quizzes
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getQuizDifficultyById = async (req, res) => {
  try {
    const quizId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: 'Invalid quiz ID' });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ difficulty: quiz.difficulty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getQuizzesByDifficultyAndNumber = async (req, res) => {
  try {
    const difficulty = req.params.difficulty;
    const numberOfQuizzes = parseInt(req.params.number);

    // Validate that numberOfQuizzes is a positive integer
    if (isNaN(numberOfQuizzes) || numberOfQuizzes <= 0) {
      return res.status(400).json({ error: 'Invalid number of quizzes' });
    }

    // Get the specified number of quizzes with the given difficulty
    const quizzes = await Quiz.find({ difficulty: difficulty }).limit(numberOfQuizzes);

    // Respond with the quizzes
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateQuizById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['category', 'type', 'difficulty', 'question', 'correctAnswer', 'incorrectAnswers'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
};
//test
exports.deleteQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteAllQuizzes = async (req, res) => {
  try {
    const result = await Quiz.deleteMany({});
    res.send({ deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.hideQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { hidden: true }, { new: true });
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.unhideQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { hidden: false }, { new: true });
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
};