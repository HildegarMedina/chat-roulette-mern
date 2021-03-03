//Modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

//Initializations
const app = express();
require("./database");

//Settings 
app.set("port", process.env.PORT || 8081);

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use(require("./routes/users"));
app.use(require("./routes/chats"));
app.use(require("./routes/messages"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Listen
app.listen(app.get("port"), () => {
    console.log("Server on port " + app.get("port"));
});