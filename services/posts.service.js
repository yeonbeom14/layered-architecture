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
}

module.exports = PostService;
