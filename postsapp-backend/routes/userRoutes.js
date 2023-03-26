const express = require('express')
const {
  getUser,
  getUsers,
  deleteUser,
  updateUser
} = require('../controllers/UserController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// router.use(requireAuth)

// index
router.get('/', getUsers)

// get
router.get('/:id', getUser)

//delete
router.delete('/:id', requireAuth, deleteUser)

//update
router.patch('/:id', requireAuth, updateUser)

module.exports = router