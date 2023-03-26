const express = require('express')
const {
    getIngredient,
    getIngredients,
    createIngredient,
    deleteIngredient,
    updateIngredient
} = require('../controllers/IngredientController')

const router = express.Router()

// index
router.get('/', getIngredients)

// get
router.get('/:id', getIngredient)

//post
router.post('/', createIngredient)

//delete
router.delete('/:id', deleteIngredient)

//update
router.patch('/:id', updateIngredient)

module.exports = router