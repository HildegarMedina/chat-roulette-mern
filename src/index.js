//Modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");

//Initializations
const app = express();
require("./database");

//Settings 
app.set("port", process.env.PORT || 8080);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use(require("./routes/users"));
app.use(require("./routes/chats"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Listen
app.listen(app.get("port"), () => {
    console.log("Server on port " + app.get("port"));
});