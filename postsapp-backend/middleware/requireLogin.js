const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  console.log(req.headers)
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }
  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findOne({ _id }).select('_id')
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ error: 'Unauthorized Request' })
  }
}

module.exports = requireAuth