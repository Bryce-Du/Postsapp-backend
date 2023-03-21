const express = require('express')
const {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/PostController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
// router.use(requireAuth)

// index
router.get('/', getPosts)

// get
router.get('/:id', getPost)

//post
router.post('/', requireAuth, createPost)

//delete
router.delete('/:id', deletePost)

//update
router.patch('/:id', updatePost)

module.exports = router