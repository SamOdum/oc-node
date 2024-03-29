const express = require("express");
const cors = require("cors");
const connect = require("./db");
const Recipe = require("./models/Recipe");

// Initialise express server
const app = express();

// Handle CORS policy
app.use(cors());

// Connect database
connect();

// Intialize middleware
app.use(express.json({ extended: false }));

// Returns all recipes in database
app.get("/api/recipes", (req, res) => {
  Recipe.find()
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
});

// Returns the recipe with the provided ID from the database
app.get("/api/recipes/:id", (req, res) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
});

// Adds a new recipe to the database
app.post("/api/recipes", (req, res) => {
  const { title, ingredients, instructions, time, difficulty } = req.body;
  const newRecipe = new Recipe({
    title,
    ingredients,
    instructions,
    time,
    difficulty,
  });

  newRecipe
    .save()
    .then(() => {
      res.status(201).json({
        message: "New recipe saved successfully",
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
});

// Modifies the recipe with the provided ID
app.put("/api/recipes/:id", (req, res) => {
  const recipe = new Recipe({
    _id: req.params.id,
    title: req.body.title,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    time: req.body.time,
    difficulty: req.body.difficulty,
  });
  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(() => {
      res.status(201).json({
        message: "Thing updated successfully!",
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
});

// Deletes the recipe with the provided ID
app.delete("/api/recipes/:id", (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch(error => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = app;
