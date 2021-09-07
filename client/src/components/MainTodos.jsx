import React, { useContext } from "react";

const MainTodos = (props) => {
  const { classes, datas, completeTodo, deleteTodo, moveTodos } = props;

  
  

  return (
    <div className={classes.TodosContainer}>
      <p style={{ fontWeight: "bold" }}>☆未完了☆</p>
      <ul>
        {datas.map((data, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: data.iscompleted && "line-through" }}
            >
              {data.todo}
            </span>
            <button onClick={() => completeTodo(index)}>完了</button>
            <button onClick={() => deleteTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
      <button className={classes.TodosMoveBtn} onClick={moveTodos}>
        下へ
      </button>
    </div>
  );
};

export default MainTodos;
