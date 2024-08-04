const mongoose = require('mongoose');

const IngredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 
});

const ingredien = mongoose.model('Ingredien', IngredientSchema);

module.exports = ingredien;