const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '3d'
    })
}

const login_post = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 })
        res.status(200).json({ user: user._id, token })
        return
    } catch (err) {
        console.log(err.message, err.code);
        res.status(400).send(err)
    }
}
const signup_post = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try{
        const user = await User.signup({ email, password });
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 })
        res.status(201).json({ user: user._id, token });
        return
    } catch (err) {
        console.log(err.message, err.code);
        res.status(400).send(err)
    }
}

module.exports = {
    login_post,
    signup_post
}