const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

router.post('/:postId/comments', authMiddleware, commentsController.createComment);
router.get('/:postId/comments', commentsController.getComments);
router.put('/:postId/comments/:commentId', authMiddleware, commentsController.updateComment);
router.delete('/:postId/comments/:commentId', authMiddleware, commentsController.deleteComment);

module.exports = router;
