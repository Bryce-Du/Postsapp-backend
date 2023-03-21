const express = require('express')
const {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/PostController')
const requireLogin = require('../middleware/requireLogin')
const requirePostAuthor = require('../middleware/requirePostAuthor')

const router = express.Router()
// router.use(requireLogin)

// index
router.get('/', getPosts)

// get
router.get('/:id', getPost)

//post
router.post('/', requireLogin, createPost)

//delete
router.delete('/:id', requirePostAuthor, deletePost)

//update
router.patch('/:id', requirePostAuthor, updatePost)

module.exports = router