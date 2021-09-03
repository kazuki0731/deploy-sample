var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");

// require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api", (req, res) => {
  pool.query("SELECT * FROM memo", function (error, results) {
    if (error) {
      throw error;
    }
    console.log("OK");
    res.status(200).json({
      data: results.rows,
    });
  });
});

// router.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
