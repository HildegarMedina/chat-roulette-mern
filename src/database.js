//Modules
const mongoose = require("mongoose");

//Vars
const uri = "mongodb://localhost/chat-roulette";

//Connect
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log("Database is running"))
    .catch(err => console.log(err));

//Exports
module.exports = mongoose;