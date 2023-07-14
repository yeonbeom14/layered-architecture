const LikeService = require('../services/likes.service');

class LikesController {
  likeService = new LikeService();
  //게시글 좋아요 api
  updateLike = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const { code, message } = await this.likeService.updateLike(userId, postId);

    res.status(code).json({ message });
  };
  // 좋아요 게시글 조회 API
  getLikes = async (req, res) => {
    const { userId } = res.locals.user;

    const { code, message, likedPosts } = await this.likeService.findAllLike(userId);

    res.status(code).json({ message, likedPosts });
  };
}

module.exports = LikesController;
