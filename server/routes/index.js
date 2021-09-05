var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", (req, res) => {
  const loginName = req.body.loginName;
  if (loginName === "kawabata") {
    res.json("OK");
  }
});

router.get("/api", (req, res) => {
  pool
    .query("SELECT * FROM todos")
    .then((results) => {
      console.log(results.rows);
      res.json({
        rows: results.rows,
      });
    })
    .catch((err) => {
      throw err;
    });
});

router.post("/regist", (req, res) => {
  const todo = req.body.todo;
  console.log(todo);
  pool
    .query("INSERT into todos(todo) VALUES($1)", [todo])
    .then(() => {
      pool.query("SELECT * FROM todos").then((results) => {
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
