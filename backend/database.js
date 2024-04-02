const { mongoose } = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.DB_ATLUS;
const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("database connected")
    }).catch((err) => {
      console.log("something went wrong")
    });
}
module.exports = connectToMongo;