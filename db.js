const mongoose = require("mongoose");

// Connect database
const mongoURI =
  "mongodb+srv://Samuel2:samuel123@cluster0-fq14v.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = () =>
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch(error => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });

module.exports = connectDB;
