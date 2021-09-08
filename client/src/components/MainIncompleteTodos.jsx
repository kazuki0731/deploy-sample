import React from "react";

const MainIncompleteTodos = (props) => {
  const { classes, completeDatas, removeTodo } = props;
  return (
    <div className={classes.completeContainer}>
      <p>☆完了☆</p>
      {completeDatas.map((data, index) => (
        <li key={index}>
          <span style={{ textDecoration: data.iscompleted && "line-through" }}>
            {data.todo}
          </span>
          <button onClick={() => removeTodo(index)}>戻す</button>
        </li>
      ))}
    </div>
  );
};

export default MainIncompleteTodos;
