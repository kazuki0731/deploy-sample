var express = require("express");
var router = express.Router();
const pool = require("../db/pool.js");

const getCompleteTodos = "SELECT * FROM completeTodos";
const getTodos = "SELECT * FROM todos";
const deleteTodos = "DELETE FROM todos";
const deleteCompleteTodos = "DELETE FROM completeTodos";
const insert = (arg) => {
  return `INSERT INTO ${arg}`;
};

router.get("/", function (req, res, next) {
  res.send("OK");
});

router.get("/todos/all", async (req, res) => {
  const results = await pool.query(getTodos).catch((e) => console.log(e));
  res.json({ rows: results.rows, user: req.session.user });
});

router.get("/todos/complete/all", async (req, res) => {
  const results = await pool
    .query(getCompleteTodos)
    .catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.put("/todo", async (req, res) => {
  const todo = req.body.todo;
  await pool
    .query(`${insert("todos")} (todo) VALUES($1)`, [todo])
    .catch((e) => console.log(e));
  const results = await pool.query(getTodos).catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.delete("/todo", async (req, res) => {
  const id = req.body.id;
  await pool
    .query(`${deleteTodos} WHERE id = $1`, [id])
    .catch((e) => console.log(e));
  res.send("OK");
});

router.put("/todos/move", async (req, res) => {
  const todos = req.body.todos;
  console.log(todos);
  for (let i of todos) {
    await pool
      .query(`${insert("completeTodos")} (todo, iscompleted) VAlUES($1, $2)`, [
        i.todo,
        i.iscompleted,
      ])
      .catch((e) => console.log(e));
  }
  const results = await pool
    .query(getCompleteTodos)
    .catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.delete("/todos/all", async (req, res) => {
  await pool.query(deleteTodos).catch((e) => {
    console.log(e);
  });
  res.send("OK");
});

router.put("/todo/complete/back", async (req, res) => {
  const todo = req.body.todo;
  const iscompleted = req.body.iscompleted;
  await pool.query(`${insert("todos")} (todo, iscompleted) VALUES($1, $2)`, [
    todo,
    iscompleted,
  ]);

  const results = await pool.query(getTodos).catch((e) => console.log(e));
  res.json({ rows: results.rows });
});

router.delete("/todo/complete", async (req, res) => {
  const id = req.body.id;
  const todo = req.body.todo;
  console.log(id, todo);
  await pool.query(`${deleteCompleteTodos} WHERE id = $1`, [id]).catch((e) => {
    console.log(e);
  });
  res.send("OK");
});

router.delete("/todos/complete/all", async (req, res) => {
  await pool.query(deleteCompleteTodos).catch((e) => {
    console.log(e);
  });
  res.send("OK");
});

module.exports = router;
