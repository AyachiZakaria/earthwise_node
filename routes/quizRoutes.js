// src/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const quizHistoryController = require('../controllers/quizHistoryController');

// Quiz Routes
/**
 * @swagger
 * /api/quiz:
 *   post:
 *     summary: Create a new quiz
 *     description: Create a new quiz with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'  # Reference to your Quiz schema
 *     responses:
 *       201:
 *         description: Successfully created a new quiz
 *         content:
 *           application/json:
 *             example:
 *               category: 'General Knowledge'
 *               type: 'multiple'
 *               difficulty: 'easy'
 *               question: 'What is the capital of France?'
 *               correct_answer: 'Paris'
 *               incorrect_answers: ['Berlin', 'London', 'Madrid']
 */
router.post('/', quizController.createQuiz);
/**
 * @swagger
 * /api/quiz:
 *   get:
 *     summary: Get all quizzes
 *     description: Retrieve a list of all quizzes
 *     responses:
 *       200:
 *         description: Successfully retrieved all quizzes
 *         content:
 *           application/json:
 *             example: []  # Provide an example of the response JSON
 */
router.get('/', quizController.getAllQuizzes);
/**
 * @swagger
 * /api/quiz/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     description: Retrieve a quiz by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the quiz
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.get('/:id', quizController.getQuizById);

/**
 * @swagger
 * /api/quiz/difficulty/{id}:
 *   get:
 *     summary: Get quiz difficulty by ID
 *     description: Retrieve the difficulty of a quiz by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the quiz difficulty
 *         content:
 *           application/json:
 *             example: { difficulty: 'easy' }  # Provide an example of the response JSON
 */
router.get('/difficulty/:id', quizController.getQuizDifficultyById);
/**
 * @swagger
 * /api/quiz/quizzes/{difficulty}:
 *   get:
 *     summary: Get quizzes by difficulty
 *     description: Retrieve a list of quizzes based on the specified difficulty
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         required: true
 *         description: Difficulty of the quizzes
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved quizzes by difficulty
 *         content:
 *           application/json:
 *             example: []  # Provide an example of the response JSON
 */
router.get('/quizzes/:difficulty', quizController.getQuizzesByDifficulty);
/**
 * @swagger
 * /api/quiz/number/{number}:
 *   get:
 *     summary: Get specified number of quizzes
 *     description: Retrieve a specified number of quizzes
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         description: Number of quizzes to retrieve
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Successfully retrieved the specified number of quizzes
 *         content:
 *           application/json:
 *             example: []  # Provide an example of the response JSON
 */
router.get('/number/:number', quizController.getNumberOfQuizzes);
/**
 * @swagger
 * /api/quiz/game/{difficulty}/{number}:
 *   get:
 *     summary: Get quizzes for a game
 *     description: Retrieve quizzes for a game based on the specified difficulty and number
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         required: true
 *         description: Difficulty of the quizzes
 *         schema:
 *           type: string
 *       - in: path
 *         name: number
 *         required: true
 *         description: Number of quizzes to retrieve
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Successfully retrieved quizzes for the game
 *         content:
 *           application/json:
 *             example: []  # Provide an example of the response JSON
 */
router.get('/game/:difficulty/:number', quizController.getQuizzesByDifficultyAndNumber);
/**
 * @swagger
 * /api/quiz/{id}:
 *   patch:
 *     summary: Update quiz by ID
 *     description: Update a quiz by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'  # Reference to your Quiz schema
 *     responses:
 *       200:
 *         description: Successfully updated the quiz
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.patch('/:id', quizController.updateQuizById);
/**
 * @swagger
 * /api/quiz/{id}:
 *   delete:
 *     summary: Delete quiz by ID
 *     description: Delete a quiz by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the quiz
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.delete('/:id', quizController.deleteQuizById);

/**
 * @swagger
 * /api/quiz/history/{id}:
 *   get:
 *     summary: Get history by ID
 *     description: Delete a quiz by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully get the quiz
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.get('/history/:userID', async (req, res) => {
    try {
        const quizHistory = await quizHistoryController.getQuizHistory(req.params.userID);
        res.json(quizHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /api/quiz/history/add:
 *   post:
 *     summary: Add a quiz history entry
 *     description: Add a new entry to the quiz history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID of the user
 *               quizID:
 *                 type: string
 *                 description: ID of the quiz
 *               selectedAnswer:
 *                 type: string
 *                 description: The selected answer
 *     responses:
 *       201:
 *         description: Successfully added a quiz history entry
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.post('/history/add', async (req, res) => {
    const { userID, quizID, selectedAnswer } = req.body;
    try {
        const quizHistoryEntry = await quizHistoryController.createQuizHistory(userID, quizID, selectedAnswer);
        res.json(quizHistoryEntry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * @swagger
 * /api/quiz/history/{userID}:
 *   delete:
 *     summary: Clear quiz history by user ID
 *     description: Clear the quiz history for a specific user
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully cleared quiz history
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.delete('/history/:userID', async (req, res) => {
    try {
        const result = await quizHistoryController.clearQuizHistory(req.params.userID);
        res.json({ message: 'Quiz history cleared successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/**
 * @swagger
 * /api/quiz/delete/all:
 *   delete:
 *     summary: Delete all quizzes
 *     description: Delete all quizzes from the database
 *     responses:
 *       200:
 *         description: Successfully deleted all quizzes
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.delete('/delete/all', quizController.deleteAllQuizzes);

/**
 * @swagger
 * /api/quiz/{id}/hide:
 *   patch:
 *     summary: Hide quiz by ID
 *     description: Hide a quiz by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully hid the quiz
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.patch('/:id/hide', quizController.hideQuizById);

module.exports = router;

/**
 * @swagger
 * /api/quiz/{id}/unhide:
 *   patch:
 *     summary: Unhide quiz by ID
 *     description: Set the visibility of a quiz to false by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully set the quiz visibility to false
 *         content:
 *           application/json:
 *             example: {}  # Provide an example of the response JSON
 */
router.patch('/:id/unhide', quizController.unhideQuizById);

module.exports = router;
