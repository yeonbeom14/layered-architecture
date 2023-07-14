const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');
const likesRouter = require('./likes.routes');

router.use('/', usersRouter);
router.use('/posts/', postsRouter);
router.use('/posts/', commentsRouter);
router.use('/', likesRouter);

module.exports = router;
