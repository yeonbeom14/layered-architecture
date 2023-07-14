const { Users, Comments } = require('../models');

class CommentRepository {
  // 댓글 생성 API
  createComment = async (userId, postId, comment) => {
    const commentData = await Comments.create({ UserId: userId, PostId: postId, comment });

    return commentData;
  };
  // 댓글 목록 조회 API
  findAllComment = async (postId) => {
    const allComment = await Comments.findAll({
      raw: true,
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      where: { PostId: postId },
      attributes: { exclude: ['PostId'] },
      order: [['createdAt', 'DESC']],
    });

    return allComment;
  };
  // commentId 확인
  findOneComment = async (commentId) => {
    const commentData = await Comments.findOne({ where: { commentId } });

    return commentData;
  };
  // 댓글 수정 api
  updateComment = async (commentId, comment) => {
    await Comments.update({ comment }, { where: { commentId } });

    return;
  };
  // 댓글 삭제 api
  deleteComment = async (commentId) => {
    await Comments.destroy({ where: { commentId } });

    return;
  };
}

module.exports = CommentRepository;
