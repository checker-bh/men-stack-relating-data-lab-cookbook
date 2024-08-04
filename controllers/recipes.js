
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/index', async (req, res) => {
  try {
    const user = req.session.user;
    const recipes = await recipe.find({ owner: user._id });

    // Send all recipes to the view 
    res.locals.recipes = recipes;
    res.render('recipes/index.ejs');


  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.redirect('/');
  }

});

router.get('/new', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render('recipes/new.ejs', { ingredients });
});




router.post('/', async (req, res) => {
  try {
    const user = req.session.user;
    // Create a new Recipe object using req.body
    const newRecipe = new recipe(req.body);
    console.log(req.body);
    newRecipe.owner = user._id
    // Save the new Recipe
    await newRecipe.save();

    // Redirect back to the recipe index view
    res.redirect('recipes/index');
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.redirect('/');
  }
});


router.get('/:recipeId/show', async (req, res) => {
  try {

    const recipes = await recipe.findById(req.params.recipeId).populate('owner');

    res.locals.recipe = recipes;
    res.render('recipes/show.ejs');


  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.redirect('/');
  }

  // res.render('recipes/show.ejs')
})


router.delete('/:recipeId/show', async (req, res) => {

  try {


    const result = await recipe.deleteOne({ _id: req.params.recipeId });

    // Check if any document was deleted
    if (result.deletedCount === 0) {
      console.log('Recipe not found or already deleted');
      return res.redirect('/');
    }
    res.redirect('/recipes/index');

  } catch (error) {

    console.log(error);
    res.redirect('/')
  }
});


router.get('/:recipeId/edit', async (req, res) => {

  try {
    const Recipes = await recipe.findById(req.params.recipeId);
    res.locals.recipe = Recipes;
    res.render('recipes/edit.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }

});


router.put('/:recipeId', async (req, res) => {
  try {
    const Recipes = await recipe.findById(req.params.recipeId);

    Recipes.name = req.body.name;
    Recipes.instructions = req.body.instructions;
    // updates the ingredients if provided, otherwise keeps the current ingredients.
    Recipes.ingredients = req.body.ingredients ? req.body.ingredients.split(',').map(id => id.trim()) : recipe.ingredients;

    await Recipes.save();

    res.redirect(`/recipes/${Recipes._id}/show`);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.redirect('/');
  }
});



module.exports = router;