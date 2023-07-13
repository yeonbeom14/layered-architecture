const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();
  // 게시글 전체 조회 API
  getPosts = async (req, res) => {
    const { code, message, allPost } = await this.postService.findAllPost();

    res.status(code).json({ message, allPost });
  };
  // 게시글 작성 API
  createPost = async (req, res) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    const { code, message, postData } = await this.postService.createPost(userId, title, content);

    res.status(code).json({ message, postData });
  };
}

module.exports = PostsController;
