//Modules
const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema
const MessagesSchema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    message: {type: String, required: true},
    chat: {
        type: Schema.Types.ObjectId,
        ref: "chats"
    }
});

//Export
module.exports = mongoose.model("messages", MessagesSchema);