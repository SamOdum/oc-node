const express = require("express");
const cors = require("cors");

const connect = require("./db");
const Recipe = require("./models/Recipe");

// Initialise express server
const app = express();
app.use(cors());

// Connect database
connect();

app.use(express.json({ extended: false }));

// app.post("/api/recipes", (req, res, next) => {
//   const recipe = new Recipe({
//     title: req.body.title,
//     ingredients: req.body.ingredients,
//     instructions: req.body.instructions,
//     time: req.body.time,
//     difficulty: req.body.difficulty,
//   });
//   recipe
//     .save()
//     .then(() => {
//       res.status(201).json({
//         message: "Recipe saved successfully!",
//       });
//     })
//     .catch(error => {
//       res.status(400).json({
//         error: error,
//       });
//     });
//   next();
// });

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

// app.put("/api/recipes/:id", (req, res) => {
//   const { title, ingredients, instructions, time, difficulty } = req.body;
//   const { _id } = req.params.id;
//   const newRecipe = new Recipe({
//     _id,
//     title,
//     ingredients,
//     instructions,
//     time,
//     difficulty,
//   });

//   Recipe.updateOne({ _id: req.params.id }, newRecipe)
//     .then(() => {
//       res.status(200).json({
//         message: "Recipe updated successfully",
//       });
//     })
//     .catch(error => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

// app.delete("/api/recipes/:id", (req, res, next) => {
//   Recipe.findOneAndDelete({ _id: req.params.id })
//     .then(recipe => {
//       res.json(recipe);
//     })
//     .catch(error => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });

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
