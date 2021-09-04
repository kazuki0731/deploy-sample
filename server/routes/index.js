var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api", (req, res) => {
  pool
    .query("SELECT * FROM memo")
    .then((results) => {
      res.json({
        rows: results.rows,
      });
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/regist", (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  pool
    .query("INSERT into memo(title, text) VALUES($1, $2)", [title, text])
    .then(() => {
      pool.query("SELECT * FROM memo").then((results) => {
        res.json({
          rows: results.rows,
        });
      });
    })
    .catch((err) => {
      throw err;
    });
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
