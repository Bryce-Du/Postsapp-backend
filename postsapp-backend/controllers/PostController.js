const Post = require('../models/postModel')
const mongoose = require('mongoose')

//index
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })

    res.status(200).json(posts)
}

//get
const getPost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Post does not exist" })
    }

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({ error: "Post does not exist" })
    }
    res.status(200).json(post)
}

//post
const createPost = async (req, res) => {
    const { title, body, edited, user } = req.body
    try {
        const post = await Post.create({ title, body, edited, user })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete
const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Post does not exist" })
    }

    const post = await Post.findOneAndDelete({ _id: id })
    if (!post) {
        return res.status(404).json({ error: "Post does not exist" })
    }

    res.status(200).json(post)
}

//patch
const updatePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Post does not exist" })
    }

    const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body })
    if (!post) {
        return res.status(404).json({ error: "Post does not exist" })

    }
    res.status(200).json(post)
}

module.exports = {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost
}