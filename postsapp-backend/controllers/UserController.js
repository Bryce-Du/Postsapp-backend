const User = require('../models/userModel')
const mongoose = require('mongoose')

//index
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 })

  res.status(200).json(users)
}

//get
const getUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" })
  }

  const user = await User.findById(id).select('-password');

  if (!user) {
    return res.status(404).json({ error: "User does not exist" })
  }
  res.status(200).json(user)
}

//delete
const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" })
  }

  const user = await User.findOneAndDelete({ _id: id })
  if (!user) {
    return res.status(404).json({ error: "User does not exist" })
  }

  res.status(200).json(user)
}

//patch
const updateUser = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist" })
  }
  console.log(req.body)
  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body })
  if (!user) {
    return res.status(404).json({ error: "User does not exist" })

  }
  res.status(200).json(user)
}

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser
}