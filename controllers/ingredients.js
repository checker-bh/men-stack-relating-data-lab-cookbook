
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');


router.get('/index', async (req, res) => {
    const ingredients = await Ingredient.find();
    res.render('ingredients/index.ejs', { ingredients });
  });
  
  // create a new ingredient
  router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
      await Ingredient.create({ name });
      res.redirect('/ingredients/index');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;