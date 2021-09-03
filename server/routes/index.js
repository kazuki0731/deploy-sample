var express = require("express");
var router = express.Router();
const { Client } = require("pg");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api", (req, res) => {
  const pool = new Client({
    database: process.env.ENV_DB,
    user: process.env.ENV_USER,
    password: process.env.ENV_PASSWORD,
    host: process.env.ENV_HOST,
    port: "5432",
  });
  pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query("SELECT name, hands FROM rank", (err, result) => {
        console.log(result.rows);
      });
    }
    res.send({ sample: "OK!!" });
  });
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
