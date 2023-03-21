const Post = require('../models/post');

const isPostAuthorized = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = isPostAuthorized;