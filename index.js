const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

var options = { origin: "*", optionsSuccessStatus: 200 };
app.use(cors(options));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const routes = require("./src/routes/index");
app.use("/api/", routes);

const port = 3003;
app.listen(port, () => console.log("Connecting to " + port));
