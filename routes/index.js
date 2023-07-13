const express = require('express');
const router = express.Router();
const postsRouter = require('./posts.routes');
const usersRouter = require('./users.routes');
const commentsRouter = require('./comments.routes');

router.get('/', (req, res) => {
  res.send('블로그 백엔드 서버 입니다! URL 목록 : /posts, /posts/:postId, /posts/:postId/comments');
});

router.use('/', usersRouter);
router.use('/posts/', postsRouter);
router.use('/posts/', commentsRouter);

module.exports = router;
