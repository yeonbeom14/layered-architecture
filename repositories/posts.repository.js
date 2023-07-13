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
}

module.exports = PostRepository;
