//Modules
const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema
const UsersSchema = new Schema({
    nick: {type: String, required: true},
    age: {type: Number, required: true},
    status: {type: Boolean, required: true, default: 0}
});

//Exports
module.exports = mongoose.model("users", UsersSchema);