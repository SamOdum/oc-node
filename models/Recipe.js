const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  time: { type: String, required: true },
  difficulty: { type: Number, min: 1, max: 5, required: true },
});

module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
