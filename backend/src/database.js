//Modules
const mongoose = require("mongoose");
require("dotenv").config();

//Vars
const uri = process.env.MONGO_URI;

//Connect
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => console.log("Database is running"))
    .catch(err => console.log(err));

//Exports
module.exports = mongoose;