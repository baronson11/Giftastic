//USING DOTENV TO READ .ENV FILE -------------------------
require("dotenv").config();

// Dependencies -----------------------------------------
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// Require API keys
const keys = require("./config/keys.js");
// Require giphy with custom API key
const giphy = require('giphy-api')(keys.giphy);

// app and port------------------------------------
const app = express();
const PORT = process.env.PORT || 8080;

// Body Parser ---------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('public'));

// Router -------------------------------------------
const htmlRoutes = require("./routes/html-routes.js");
const apiRoutes = require("./routes/api-routes.js");

app.use(htmlRoutes);
app.use(apiRoutes);

// Starts the server -----------------------------------------
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
