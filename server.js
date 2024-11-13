
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const sessionMiddleware = require("./src/helperMildware/session");
const connectDb = require("./src/db/connectDb");// requiring the the database connection
const getRoute=require("./src/route/getRoute");
const postRoute=require("./src/route/postRoute")

const app = express();
connectDb();

// Middleware to parse URL-encoded and JSON data
app.use(bodyParser.urlencoded({ extended: true })); // requesting the body parser to be able to get form data
app.use(bodyParser.json());

app.set("view engine", "ejs");// setting up our templating engine in our express server application
app.set("views", path.join(__dirname, "view"));// setting up our directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use(sessionMiddleware);

// Route handlers
app.use(getRoute);
app.use(postRoute);

const PORT = process.env.PORT || 3000;// server port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

