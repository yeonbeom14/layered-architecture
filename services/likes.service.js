const PostRepository = require('../repositories/posts.repository');
const LikeRepository = require('../repositories/likes.repository');

class LikeService {
  postRepository = new PostRepository();
  likeRepository = new LikeRepository();
  // 게시글 좋아요 API
  updateLike = async (userId, postId) => {
    try {
      const post = await this.postRepository.findOnePost(postId);
      if (!post) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }

      const liked = await this.likeRepository.findOneLike(userId, postId);
      if (!liked) {
        await this.likeRepository.incrementLike(userId, postId);
        return { code: 200, message: '게시글의 좋아요를 등록하였습니다.' };
      } else {
        await this.likeRepository.decrementLike(userId, postId);
        return { code: 200, message: '게시글의 좋아요를 취소하였습니다.' };
      }
    } catch (err) {
      return { code: 400, message: '게시글 좋아요에 실패하였습니다.' };
    }
  };
  // 좋아요 게시글 조회 API
  findAllLike = async (userId) => {
    try {
      const likedPosts = await this.likeRepository.findAllLike(userId);

      return { code: 200, likedPosts };
    } catch (err) {
      return { code: 500, message: '좋아요 게시글 조회에 실패하였습니다.' };
    }
  };
}

module.exports = LikeService;
