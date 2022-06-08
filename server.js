// To allow to start the server
const express = require("express");
const dotenv = require("dotenv"); // Allow you to separate your secrect from your source code
const morgan = require("morgan"); // It console.log() the type of Requests we get
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");

const app = express();


// To let the dotenv Module the path where we have the .env file with all our Enviroment VIARABLES
dotenv.config( {path: 'config.env'})

const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// We create a middleware to parse REQUEST to body parser
app.use(bodyparser.urlencoded({ extended: true}))

//In order to get REQ.BODY data sent from $http.POST from Angularjs
app.use(express.json())

// set EJS view engine 
app.set("view engine", "ejs");

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)})