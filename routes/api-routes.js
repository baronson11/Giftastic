// Dependencies --------------------------------------
const express = require("express");
const router = express.Router();
// Require API keys
const keys = require("../config/keys.js");
// Require giphy with custom API key
const giphy = require('giphy-api')(keys.giphy);

// Routes ---------------------------------------------

router.post("/api/search", (req, res) => {
  console.log(req.body);
  let search = req.body.search;
  console.log(search)
  // Search with a plain string using callback
  giphy.search(search, function (err, results) {
    res.json(results);
  });
});


module.exports = router;
