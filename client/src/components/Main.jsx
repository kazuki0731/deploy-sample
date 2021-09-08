import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Mainform from "./Mainform";
import MainTodos from "./MainTodos";
import MainIncompleteTodos from "./MainIncompleteTodos";
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
    "& li": {
      listStyle: "none",
    },

    "& p": {
      fontWeight: "bold",
    },
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

  const getTodosAndUsers = async () => {
    const res = await axios.get("/api");
    setTodos(res.data.rows);
    setUser(res.data.user);
  };

  useEffect(() => {
    getTodosAndUsers();
  }, []);

  const submitTodo = (data) => {
    axios.put("/user", data).then((res) => {
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
    const deleteTodo = todos[todoIndex].todo;
    axios
      .delete("/user", { data: { id: deleteId, todo: deleteTodo } })
      .then((res) => {
        if (res.data === "OK") {
          todos.splice(todoIndex, 1);
          setTodos([...todos]);
        }
      });
  };

  const moveTodos = () => {
    setCompleteTodos([...todos, ...completeTodos]);
    setTodos([]);
  };

  const removeTodo = (removeIndex) => {
    const removeTodo = completeTodos[removeIndex];
    completeTodos.splice(removeIndex, 1);
    todos.push(removeTodo);
    setCompleteTodos([...completeTodos]);
    setTodos([...todos]);
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

      <MainIncompleteTodos
        classes={classes}
        removeTodo={removeTodo}
        completeTodos={completeTodos}
      />
    </div>
  );
}

export default Main;
