import React from "react";

const MainCompleteTodos = (props) => {
  const { classes, completeTodos, backTodo, deleteCompleteTodos } = props;
  return (
    <div className={classes.completeContainer}>
      <p>☆完了☆</p>
      {completeTodos.map((todo, index) => (
        <li key={index}>
          <span className={todo.iscompleted ? classes.active : ""}>
            {todo.todo}
          </span>
          <button onClick={() => backTodo(index)}>戻す</button>
        </li>
      ))}
      <button onClick={deleteCompleteTodos} className={classes.todosMoveBtn}>
        削除
      </button>
    </div>
  );
};

export default MainCompleteTodos;
