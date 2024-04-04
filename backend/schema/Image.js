const mongoose = require("mongoose")

const imageSchema = mongoose.Schema({
   name : {type:String, required: true},
   filename:{type:String, required: true},
   path : {type:String, required: true},
})

const ImageModel = mongoose.model("webimg", imageSchema)

module.exports = {ImageModel}