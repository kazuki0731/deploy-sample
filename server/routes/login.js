var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    res.send("OK");
  } else {
    res.send("NG");
  }
});

router.post("/", (req, res) => {
  const loginName = req.body.loginName;
  if (loginName === "kawabata") {
    req.session.user = loginName;
    res.send("OK");
  } else {
    res.send("NG");
  }
});

module.exports = router;
