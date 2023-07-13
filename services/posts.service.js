const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();
  // 게시글 전체 조회 API
  findAllPost = async () => {
    try {
      const allPost = await this.postRepository.findAllPost();

      return { code: 200, allPost };
    } catch (err) {
      return { code: 500, message: '게시글 조회에 실패하였습니다.' };
    }
  };
  // 게시글 작성 API
  createPost = async (userId, title, content) => {
    try {
      if (!title || !content) {
        return { code: 412, message: '제목 또는 내용이 입력되지 않았습니다.' };
      }
      const postData = await this.postRepository.createPost(userId, title, content);

      return { code: 201, message: '게시글 작성에 성공하였습니다.', postData };
    } catch (err) {
      return { code: 400, message: '게시글 작성에 실패하였습니다.' };
    }
  };
  // 게시글 상세 조회 API
  findOnePost = async (postId) => {
    try {
      const postDetailData = await this.postRepository.findOnePost(postId);
      if (!postDetailData) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }
      return { code: 200, postDetailData };
    } catch (err) {
      return { code: 400, message: '게시글 조회에 실패하였습니다.' };
    }
  };
  //게시글 수정 API
  updatePost = async (userId, postId, title, content) => {
    try {
      const updatedPost = await this.postRepository.findOnePost(postId);
      if (!updatedPost) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }
      if (!title || !content) {
        return { code: 412, message: '제목 또는 내용이 입력되지 않았습니다.' };
      }
      if (userId !== updatedPost.UserId) {
        return { code: 403, message: '게시글 수정의 권한이 존재하지 않습니다.' };
      }

      await this.postRepository.updatePost(postId, title, content);
      return { code: 200, message: '게시글을 수정하였습니다.' };
    } catch (err) {
      return { code: 400, message: '게시글 수정에 실패하였습니다.' };
    }
  };
  //게시글 삭제 API
  deletePost = async (userId, postId) => {
    try {
      const deletedPost = await this.postRepository.findOnePost(postId);
      if (!deletedPost) {
        return { code: 404, message: '게시글이 존재하지 않습니다.' };
      }
      if (userId !== deletedPost.UserId) {
        return { code: 403, message: '게시글의 삭제 권한이 존재하지 않습니다.' };
      }

      await this.postRepository.deletePost(postId);
      return { code: 200, message: '게시글을 삭제하였습니다.' };
    } catch (err) {
      return { code: 400, message: '게시글 삭제에 실패하였습니다.' };
    }
  };
}

module.exports = PostService;
