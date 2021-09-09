var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("OK");
});

router.post("/login", (req, res) => {
  const loginName = req.body.loginName;
  if (loginName === "kawabata") {
    req.session.user = loginName;
    res.send("OK");
  }
});

router.get("/allTodos", async (req, res) => {
  const results = await pool
    .query("SELECT * FROM todos")
    .catch((e) => console.log(e));
  res.json({ rows: results.rows, user: req.session.user });
});

router.get("/allCompleteTodos", async (req, res) => {
  const results = await pool
    .query("SELECT * FROM completeTodos")
    .catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.put("/todo", async (req, res) => {
  const todo = req.body.todo;
  await pool
    .query("INSERT INTO todos(todo) VALUES($1)", [todo])
    .catch((e) => console.log(e));
  const results = await pool
    .query("SELECT * FROM todos")
    .catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.delete("/todo", async (req, res) => {
  const id = req.body.id;
  await pool
    .query("DELETE FROM todos WHERE id = $1", [id])
    .catch((e) => console.log(e));
  res.send("OK");
});

router.put("/moveTodos", async (req, res) => {
  const todos = req.body.todos;
  console.log(todos);
  for (let i of todos) {
    await pool
      .query("INSERT INTO completeTodos(todo, iscompleted) VAlUES($1, $2)", [
        i.todo,
        i.iscompleted,
      ])
      .catch((e) => console.log(e));
  }
  const results = await pool
    .query("SELECT * FROM completeTodos")
    .catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.delete("/allTodos", async (req, res) => {
  await pool.query("DELETE FROM todos").catch((e) => {
    console.log(e);
  });
  res.send("OK");
});

router.delete("/completeTodo", async (req, res) => {
  const id = req.body.id;
  const todo = req.body.todo;
  console.log(id, todo);
  await pool
    .query("DELETE FROM completeTodos WHERE id = $1", [id])
    .catch((e) => {
      console.log(e);
    });
  res.send("OK");
});

router.put("/backCompleteTodo", async (req, res) => {
  const todo = req.body.todo;
  const iscompleted = req.body.iscompleted;
  await pool.query("INSERT INTO todos(todo, iscompleted) VALUES($1, $2)", [
    todo,
    iscompleted,
  ]);

  const results = await pool
    .query("SELECT * FROM todos")
    .catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.delete("/allCompleteTodos", async (req, res) => {
  await pool.query("DELETE FROM completeTodos").catch((e) => {
    console.log(e);
  });
  res.send("OK");
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
