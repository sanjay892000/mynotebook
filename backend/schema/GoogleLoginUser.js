const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    image: String
}, { timestamps: true });


module.exports = new mongoose.model("googleUser", userSchema);
