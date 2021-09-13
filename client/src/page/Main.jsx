import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Mainform from "../component/Form";
import MainTodos from "../component/Todos";
import MainCompleteTodos from "../component/CompleteTodos";
import { useContext } from "react";
import { formContext } from "../context/ContextForm";

const useStyles = makeStyles({
  todosContainer: {
    height: "250px",
    backgroundColor: "skyblue",
    position: "relative",
    "& li": {
      listStyle: "none",
    },
    "& p": {
      fontWeight: "bold",
    },
  },

  completeContainer: {
    height: "250px",
    backgroundColor: "lightgreen",
    position: "relative",
    "& li": {
      listStyle: "none",
    },
    "& p": {
      fontWeight: "bold",
    },
  },

  active: {
    textDecoration: "line-through",
  },

  todosMoveBtn: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
  },
});

function Main() {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const classes = useStyles();
  const { reset } = useContext(formContext);

  const getTodos = async () => {
    const todos = await axios.get("/todos/all");
    const completeTodos = await axios.get("/todos/complete/all");
    setTodos(todos.data.rows);
    setCompleteTodos(completeTodos.data.rows);
    setUser(todos.data.user);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const submitTodo = async (data) => {
    if (data.todo === "") return;
    const res = await axios.put("/todo", data).catch((e) => console.log(e));
    setTodos(res.data.rows);
    reset();
  };

  const completeTodo = (todoIndex) => {
    const newTodos = todos.map((todo, index) => {
      if (index === todoIndex) {
        todo.iscompleted = !todo.iscompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = async (todoIndex) => {
    const deleteId = todos[todoIndex].id;
    await axios
      .delete("/todo", { data: { id: deleteId } })
      .catch((e) => console.log(e));
    todos.splice(todoIndex, 1);
    setTodos([...todos]);
  };

  const moveTodos = async () => {
    const result = await axios
      .put("/todos/move", { todos: todos })
      .catch((e) => {
        console.log(e);
      });
    await axios.delete("/todos/all").catch((e) => {
      console.log(e);
    });
    setCompleteTodos([...result.data.rows]);
    setTodos([]);
  };

  const backTodo = async (backTodoIndex) => {
    const backTodo = completeTodos[backTodoIndex];
    const result = await axios.put("/todo/complete/back", {
      todo: backTodo.todo,
      iscompleted: backTodo.iscompleted,
    });
    await axios.delete("/todo/complete", {
      data: { id: backTodo.id, todo: backTodo.todo },
    });
    completeTodos.splice(backTodoIndex, 1);
    setCompleteTodos([...completeTodos]);
    setTodos([...result.data.rows]);
  };

  const deleteCompleteTodos = async () => {
    await axios.delete("/todos/complete/all");
    setCompleteTodos([]);
  };

  return (
    <div>
      <div>
        <h1>Todoリスト</h1>
        <p>
          ようこそ <strong>{user}</strong> さん
        </p>
      </div>
      <Mainform submitTodo={submitTodo} />
      <MainTodos
        todos={todos}
        completeTodo={completeTodo}
        moveTodos={moveTodos}
        deleteTodo={deleteTodo}
        classes={classes}
      />
      <MainCompleteTodos
        classes={classes}
        backTodo={backTodo}
        deleteCompleteTodos={deleteCompleteTodos}
        completeTodos={completeTodos}
      />
    </div>
  );
}

export default Main;
