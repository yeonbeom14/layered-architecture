const { Users, Posts } = require('../models');

class PostRepository {
  // 게시글 전체 조회 API
  findAllPost = async () => {
    const allPost = await Posts.findAll({
      raw: true,
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      attributes: { exclude: ['content'] },
      order: [['createdAt', 'DESC']],
    });

    return allPost;
  };
  // 게시글 작성 API
  createPost = async (userId, title, content) => {
    const postData = await Posts.create({ UserId: userId, title, content });

    return postData;
  };
  // 게시글 상세 조회 API
  findOnePost = async (postId) => {
    const postDetailData = await Posts.findOne({
      raw: true,
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      where: { postId },
    });

    return postDetailData;
  };
  //게시글 수정 API
  updatePost = async (postId, title, content) => {
    await Posts.update({ title, content }, { where: { postId } });

    return;
  };
  //게시글 삭제 API
  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });

    return;
  };
}

module.exports = PostRepository;
