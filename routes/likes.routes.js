const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.put('/posts/:postId/likes', authMiddleware, likesController.updateLike);
router.get('/likes', authMiddleware, likesController.getLikes);

module.exports = router;
