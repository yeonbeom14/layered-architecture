const PostRepository = require('../repositories/posts.repository');
const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  postRepository = new PostRepository();
  commentRepository = new CommentRepository();

  // 댓글 생성 API
  createComment = async (userId, postId, comment) => {
    try {
      const post = await this.postRepository.findOnePost(postId);
      if (!post) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }
      if (!comment) {
        return { code: 412, message: '댓글 내용을 입력해주세요.' };
      }

      const commentData = await this.commentRepository.createComment(userId, postId, comment);

      return { code: 201, message: '댓글을 작성하였습니다.', commentData };
    } catch (err) {
      return { code: 400, message: '댓글 작성에 실패하였습니다.' };
    }
  };
  // 댓글 목록 조회 API
  findAllComment = async (postId) => {
    try {
      const post = await this.postRepository.findOnePost(postId);
      if (!post) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }
      const allComment = await this.commentRepository.findAllComment(postId);

      return { code: 200, allComment };
    } catch (err) {
      return { code: 500, message: '댓글 조회에 실패하였습니다.' };
    }
  };
  //댓글 수정 API
  updateComment = async (userId, postId, commentId, comment) => {
    try {
      const post = await this.postRepository.findOnePost(postId);
      if (!post) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }
      if (!comment) {
        return { code: 412, message: '댓글 내용을 입력해주세요.' };
      }

      const updatedComment = await this.commentRepository.findOneComment(commentId);
      if (!updatedComment) {
        return { code: 404, message: '댓글이 존재하지 않습니다.' };
      }
      if (userId !== updatedComment.UserId) {
        return { code: 403, message: '댓글 수정 권한이 없습니다.' };
      }

      await this.commentRepository.updateComment(commentId, comment);

      return { code: 200, message: '댓글을 수정하였습니다.' };
    } catch (err) {
      return { code: 400, message: '댓글 수정에 실패하였습니다.' };
    }
  };
  //댓글 삭제 API
  deleteComment = async (userId, postId, commentId) => {
    try {
      const post = await this.postRepository.findOnePost(postId);
      if (!post) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }
      const deletedComment = await this.commentRepository.findOneComment(commentId);
      if (!deletedComment) {
        return { code: 404, message: '댓글이 존재하지 않습니다.' };
      }
      if (userId !== deletedComment.UserId) {
        return { code: 403, message: '댓글 삭제 권한이 없습니다.' };
      }

      await this.commentRepository.deleteComment(commentId);
      return { code: 200, message: '댓글을 삭제하였습니다.' };
    } catch (err) {
      return { code: 400, message: '댓글 삭제에 실패하였습니다.' };
    }
  };
}

module.exports = CommentService;
