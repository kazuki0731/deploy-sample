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
    req.session.user = loginName;
    res.json("OK");
  }
});

router.get("/api", async (req, res) => {
  const results = await pool
    .query("SELECT * FROM todos")
    .catch((e) => console.log(e));
  await res.json({ rows: results.rows, user: req.session.user });
});

router.post("/registUser", async (req, res) => {
  const todo = req.body.todo;
  await pool
    .query("INSERT INTO todos(todo) VALUES($1)", [todo])
    .catch((e) => console.log(e));
  const results = await pool
    .query("SELECT * FROM todos")
    .catch((e) => console.log(e));
  await res.json({ rows: results.rows });
});

router.post("/deleteUser", async (req, res) => {
  const id = req.body.id;
  const todo = req.body.todo;

  await pool
    .query("DELETE FROM todos where id = $1  AND todo = $2", [id, todo])
    .catch((e) => console.log(e));
  res.send("OK");
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
