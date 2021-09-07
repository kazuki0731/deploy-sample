import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Mainform from "./Mainform";
import MainTodos from "./MainTodos";
import MainIncompleteTodos from "./MainIncompleteTodos";

const useStyles = makeStyles({
  TodosContainer: {
    height: "250px",
    backgroundColor: "skyblue",
    position: "relative",
    "& li": {
      listStyle: "none",
    },
  },
  completeContainer: {
    height: "250px",
    backgroundColor: "lightgreen",
    "& li": {
      listStyle: "none",
    },
  },
  TodosMoveBtn: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
  },
});

function Main() {
  const [user, setUser] = useState("");
  const [datas, setDatas] = useState([]);
  const [completeDatas, setCompleteDatas] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const classes = useStyles();

  const getTodosAndUsers = async () => {
    const res = await axios.get("/api");
    setDatas(res.data.rows);
    setUser(res.data.user);
  };

  useEffect(() => {
    getTodosAndUsers();
  }, []);

  const submitTodo = (data) => {
    axios.post("/registUser", data).then((res) => {
      setDatas(res.data.rows);
    });
    reset();
  };

  const completeTodo = (todoIndex) => {
    const newDatas = datas.map((data, index) => {
      if (index === todoIndex) {
        data.iscompleted = !data.iscompleted;
      }
      return data;
    });
    setDatas(newDatas);
  };

  const deleteTodo = (todoIndex) => {
    const deleteId = datas[todoIndex].id;
    const deleteTodo = datas[todoIndex].todo;
    axios
      .post("/deleteUser", { id: deleteId, todo: deleteTodo })
      .then((res) => {
        if (res.data === "OK") {
          datas.splice(todoIndex, 1);
          setDatas([...datas]);
        }
      });
  };

  const moveTodos = () => {
    setCompleteDatas([...datas, ...completeDatas]);
    setDatas([]);
  };

  const removeTodo = (removeIndex) => {
    const removeTodo = completeDatas[removeIndex];
    completeDatas.splice(removeIndex, 1);
    datas.push(removeTodo);
    setCompleteDatas([...completeDatas]);
    setDatas([...datas]);
  };

  return (
    <div>
      <div>
        <h1>Todoリスト</h1>
        <p>
          ようこそ <strong>{user}</strong> さん
        </p>
      </div>

      <Mainform
        register={register}
        handleSubmit={handleSubmit}
        submitTodo={submitTodo}
      />

      <MainTodos
        datas={datas}
        completeTodo={completeTodo}
        moveTodos={moveTodos}
        deleteTodo={deleteTodo}
        classes={classes}
      />

      <MainIncompleteTodos
        classes={classes}
        removeTodo={removeTodo}
        completeDatas={completeDatas}
      />
    </div>
  );
}

export default Main;
