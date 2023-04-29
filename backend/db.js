const mongoose = require("mongoose");
const mongoURI = `mongodb://localhost:27017/`;

const connectToDatabase = () => {
  mongoose.connect(mongoURI);
  console.log(`Database connected successfully`);
};

module.exports = connectToDatabase;
