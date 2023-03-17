const Ingredient = require('../models/ingredientModel')
const mongoose = require('mongoose')

//index
const getIngredients = async (req, res) => {
    const ingredients = await Ingredient.find({})

    res.status(200).json(ingredients)
}

//get
const getIngredient = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Ingredient does not exist"})
    }

    const ingredient = await Ingredient.findById(id)

    if (!ingredient) {
        return res.status(404).json({error: "Ingredient does not exist"})
    }
    res.status(200).json(ingredient)
}

//post
const createIngredient = async (req, res) => {
    const {name, calories, servingSize, servingUnits} = req.body
    try {
        const ingredient = await Ingredient.create({name, calories, servingSize, servingUnits})
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete
const deleteIngredient = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Ingredient does not exist"})
    }

    const ingredient = await Ingredient.findOneAndDelete({_id: id})
    if (!ingredient) {
        return res.status(404).json({error: "Ingredient does not exist"})
    }

    res.status(200).json(ingredient)
}

//patch
const updateIngredient = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Ingredient does not exist"})
    }

    const ingredient = await Ingredient.findOneAndUpdate({_id: id}, { ...req.body })
    if (!ingredient) {
        return res.status(404).json({error: "Ingredient does not exist"})

    }
    res.status(200).json(ingredient)
}

module.exports = {
    getIngredient,
    getIngredients,
    createIngredient,
    deleteIngredient,
    updateIngredient
}