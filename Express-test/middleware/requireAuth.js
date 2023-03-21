const User = require('../models/user');

const requireAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = requireAuth;