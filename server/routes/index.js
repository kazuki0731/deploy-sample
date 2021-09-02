var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api", (req, res) => {
  res.json({ message: "Hello World and Japan!" });
});

router.get("/user", (req, res) => {
  const db = new sqlite3.Database("../mydb.sqlite3");
  db.get("select * from users", (err, row) => {
    res.json(row);
    console.log(row);
  });
  db.close();
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
