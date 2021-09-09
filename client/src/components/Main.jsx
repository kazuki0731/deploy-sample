import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Mainform from "./Mainform";
import MainTodos from "./MainTodos";
import MainCompleteTodos from "./MainCompleteTodos";
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
    const todos = await axios.get("/allTodos");
    const completeTodos = await axios.get("/allCompleteTodos");
    setTodos(todos.data.rows);
    setCompleteTodos(completeTodos.data.rows);
    setUser(todos.data.user);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const submitTodo = (data) => {
    axios.put("/todo", data).then((res) => {
      setTodos(res.data.rows);
    });
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

  const deleteTodo = (todoIndex) => {
    const deleteId = todos[todoIndex].id;
    axios.delete("/todo", { data: { id: deleteId } }).then((res) => {
      todos.splice(todoIndex, 1);
      setTodos([...todos]);
    });
  };

  const moveTodos = async () => {
    const result = await axios
      .put("/moveTodos", { todos: todos })
      .catch((e) => {
        console.log(e);
      });
    await axios.delete("/allTodos").catch((e) => {
      console.log(e);
    });
    setCompleteTodos([...result.data.rows]);
    setTodos([]);
  };

  const backTodo = async (backTodoIndex) => {
    const backTodo = completeTodos[backTodoIndex];
    const result = await axios.put("/backCompleteTodo", {
      todo: backTodo.todo,
      iscompleted: backTodo.iscompleted,
    });
    await axios.delete("/completeTodo", {
      data: { id: backTodo.id, todo: backTodo.todo },
    });
    completeTodos.splice(backTodoIndex, 1);
    setCompleteTodos([...completeTodos]);
    setTodos([...result.data.rows]);
  };

  const deleteCompleteTodos = () => {
    axios.delete("/allCompleteTodos").then((res) => {
      setCompleteTodos([]);
    });
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
