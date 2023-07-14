const { Likes, Posts, Users } = require('../models');

class LikeRepository {
  // Likes 테이블에서 좋아요 여부 확인
  findOneLike = async (userId, postId) => {
    const liked = await Likes.findOne({ where: { UserId: userId, PostId: postId } });

    return liked;
  };
  // 게시글 좋아요
  incrementLike = async (userId, postId) => {
    await Posts.increment({ likeCount: 1 }, { where: { postId } });
    await Likes.create({ UserId: userId, PostId: postId });

    return;
  };
  // 게시글 좋아요 취소
  decrementLike = async (userId, postId) => {
    await Posts.decrement({ likeCount: 1 }, { where: { postId } });
    await Likes.destroy({ where: { UserId: userId, PostId: postId } });

    return;
  };
  // 좋아요 게시글 조회 API
  findAllLike = async (userId) => {
    const likedPosts = await Likes.findAll({
      raw: true,
      include: [
        {
          model: Posts,
          attributes: ['title', 'likeCount', 'createdAt'],
          include: [
            {
              model: Users,
              attributes: ['nickname'],
            },
          ],
        },
      ],
      where: { UserId: userId },
      order: [[{ model: Posts }, 'likeCount', 'DESC']],
    });

    return likedPosts;
  };
}

module.exports = LikeRepository;
