import React from "react";

const MainIncompleteTodos = (props) => {
  const { classes, completeTodos, removeTodo } = props;
  return (
    <div className={classes.completeContainer}>
      <p>☆完了☆</p>
      {completeTodos.map((todo, index) => (
        <li key={index}>
          <span style={{ textDecoration: todo.iscompleted && "line-through" }}>
            {todo.todo}
          </span>
          <button onClick={() => removeTodo(index)}>戻す</button>
        </li>
      ))}
    </div>
  );
};

export default MainIncompleteTodos;
