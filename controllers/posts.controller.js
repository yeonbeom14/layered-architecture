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
  // 게시글 상세 조회 API
  getPostDetail = async (req, res) => {
    const { postId } = req.params;

    const { code, message, postDetailData } = await this.postService.findOnePost(postId);

    res.status(code).json({ message, postDetailData });
  };
  //게시글 수정 API
  updatePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;

    const { code, message } = await this.postService.updatePost(userId, postId, title, content);

    res.status(code).json({ message });
  };
  //게시글 삭제 API
  deletePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const { code, message } = await this.postService.deletePost(userId, postId);

    res.status(code).json({ message });
  };
}

module.exports = PostsController;
