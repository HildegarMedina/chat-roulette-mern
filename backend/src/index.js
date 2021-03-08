//Modules
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

//Initializations
const app = express();
require("./database");
var whitelist = ['http://localhost:3000', "http://192.168.1.54:3000"];
var corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback("Not allowed by CORS")
        }
    }
}

//Settings 
app.set("port", process.env.PORT || 8081);

//Middlewares
app.use(cors(corsOptions));
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