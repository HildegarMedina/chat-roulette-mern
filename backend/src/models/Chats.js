//Modules
const mongoose = require("mongoose");
const {Schema} = mongoose;

//Create schema
const ChatsSchema = new Schema({
    user1: {type: String, required: true},
    user2: {type: String, required: true},
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "messages"
    }]
});

//Export
module.exports = mongoose.model("chats", ChatsSchema);