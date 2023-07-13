const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.post('/', authMiddleware, postsController.createPost);

module.exports = router;
