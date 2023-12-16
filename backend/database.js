const { mongoose } = require("mongoose");
const mongoURI="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.0";
 const connectToMongo=()=>{
  mongoose.connect(mongoURI)
  .then(() => {
    console.log("database connected")
  }).catch((err) => {
    console.log("something went wrong")
  });
 }
  module.exports=connectToMongo;