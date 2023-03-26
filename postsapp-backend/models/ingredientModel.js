const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true,
    },
    servingSize: {
        type: Number,
        required: true
    },
    servingUnits: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Ingredient', ingredientSchema)