const { Post } = require('../models/posts.js');
const { Comment } = require('../models/comment.js');

module.exports = {
  createPost: async (req, res) => {
    try {
      console.log('Form Data:', req.body);
  
      const { iduser, title, content, author, media} = req.body;
  
      // Verification of required fields
      /*if (!iduser || !title || !content || !author) {
        console.log('Missing required fields');
        return res.status(400).json({
            statusCode: 400,
            message: 'Missing required fields',
        });
    }
  */
      const post = await Post.create({
        iduser: iduser,
        title: title,
        content: content,
        author: author,
        media: `${req.protocol}://${req.get('host')}/media/${req.file.filename}`,
        // Add other fields specific to your post model*/
      });
  
      await post.save();
  
      return res.status(201).json({
        statusCode: 201,
        message: 'Post created',
        post: post,
      });
    } catch (error) {
      console.error('Error in createPost:', error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },
  fetchPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: "Post not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "Post fetched successfully",
        post: post,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  fetchAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      const result = [];
      for (const post of posts) {
        result.push({
          iduser: post.iduser,
          author: post.author,
          title: post.title,
          content: post.content,
          media: post.media,
          like: post.like,
          dislike: post.dislike
        });
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: "Post not found",
        });
      }

      await post.remove();

      return res.status(200).json({
        statusCode: 200,
        message: "Post deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  },
  like: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.like += 1;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Corrected dislike function
  dislike: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      post.dislike += 1;
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createComment: async (req, res) => {
    try {
      const { postId, commenter, text } = req.body;
  
      if (!postId || !commenter || !text) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Missing required fields for comment',
        });
      }
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Post not found',
        });
      }
  
      const comment = new Comment({
        postId: postId,
        commenter: commenter,
        text: text,
      });
  
      await comment.save();
  
      // Check if the comments array exists, if not, initialize it
      if (!post.comments) {
        post.comments = [];
      }
  
      // Add the comment to the post's comments array
      post.comments.push(comment);
  
      // Save the changes to the post
      await post.save();
  
      return res.status(201).json({
        statusCode: 201,
        message: 'Comment created',
        comment: comment,
      });
    } catch (error) {
      console.error('Error in createComment:', error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },
  fetchComments: async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Post not found',
        });
      }
  
      const comments = await Comment.find({ postId: postId });
  
      if (!comments || comments.length === 0) {
        return res.status(200).json({
          statusCode: 200,
          message: 'No comments found',
          comments: [],
        });
      }
  
      return res.status(200).json({
        statusCode: 200,
        message: 'Comments fetched successfully',
        comments: comments,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  },
};
