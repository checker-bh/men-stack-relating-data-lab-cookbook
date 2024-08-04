const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User',
    },
    ingredients: {
        type: [mongoose.Schema.Types.ObjectId], // ref using array of id 
        required: false,
        ref:'Ingredient',
    },
})

const recipe = mongoose.model('Recipe',recipeSchema);

module.exports= recipe;