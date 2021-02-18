//Modules
const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema
const MessagesSchema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    message: {type: String, required: true}
});

//Export
module.exports = mongoose.model("messages", MessagesSchema);