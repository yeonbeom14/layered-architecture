const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();
  // 댓글 생성 API
  createComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;

    const { code, message, commentData } = await this.commentService.createComment(
      userId,
      postId,
      comment
    );

    res.status(code).json({ message, commentData });
  };
  // 댓글 목록 조회 API
  getComments = async (req, res) => {
    const { postId } = req.params;

    const { code, message, allComment } = await this.commentService.findAllComment(postId);

    res.status(code).json({ message, allComment });
  };
  //댓글 수정 api
  updateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    const { code, message } = await this.commentService.updateComment(
      userId,
      postId,
      commentId,
      comment
    );

    res.status(code).json({ message });
  };
  //댓글 삭제 api
  deleteComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;

    const { code, message } = await this.commentService.deleteComment(userId, postId, commentId);

    res.status(code).json({ message });
  };
}

module.exports = CommentsController;
