var express = require("express");
var router = express.Router();
const pg = require("pg");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api", (req, res) => {
  const pool = new pg.Pool({
    database: "blogapp",
    user: "kawabata",
    password: "XLwdAX2m",
    host: "localhost",
    port: "5432",
  });
  pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query("SELECT name FROM staff", (err, result) => {
        res.send({
          datas: result.rows[0].name,
        });
        // res.json({ message: "Hello World!" });
        console.log(result.rows[0].name);
      });
    }
  });
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
