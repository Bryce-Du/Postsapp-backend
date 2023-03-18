const express = require('express')
const {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/PostController')

const router = express.Router()

// index
router.get('/', getPosts)

// get
router.get('/:id', getPost)

//post
router.post('/', createPost)

//delete
router.delete('/:id', deletePost)

//update
router.patch('/:id', updatePost)

module.exports = router