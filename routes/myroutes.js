const express = require('express');
const postController = require('../controllers/postcontroller.js');
const multer = require('../Midleware/multer-config.js');
const router = express.Router();

// Gestion publication 
// Create
router.post('/posts/add', multer, postController.createPost);
router.post('/posts/:id/like', postController.like);
router.post('/posts/:id/dislike', postController.dislike);
router.post('/comments/add', multer, postController.createComment);

// Read
router.get('/posts/:id', multer, postController.fetchPost);
router.get('/posts', multer, postController.fetchAllPosts);
router.get('/comments/:postId', postController.fetchComments);

// Delete
router.delete('/posts/:id', postController.deletePost);

// Gestion Quiz

module.exports = router;
