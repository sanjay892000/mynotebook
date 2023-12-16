const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new mongoose.Schema({  //'new mongoose.Schema' likho ya 'new Schema' likho
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        unique:true
    }, // String is shorthand for {type: String}
    description: {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    tag: {
        type: String,
        default: "General"
    }, // String is shorthand for {type: String
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model("notes", NotesSchema);
