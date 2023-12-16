const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   emails:{
    type:String,
    required:true,
    unique:true
   },
   contact:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
     date: {
        type: Date,
        default: Date.now
    }

});
module.exports=mongoose.model('createuser',UserSchema);