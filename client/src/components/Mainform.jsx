import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonSource from "./ButtonSource";
import TextSource from "./TextSource";
import { useContext } from "react";
import { formContext } from "../context/ContextForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",

    "& > *": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
  btn: {
    height: "40px",
    width: "30px",
    marginTop: "15px",
  },
}));

const Mainform = (props) => {
  const { submitTodo } = props;
  const classes = useStyles();
  const { handleSubmit } = useContext(formContext);

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(submitTodo)}>
        <TextSource label={"Todoを入力"} registText={"todo"} />
        <ButtonSource classes={classes.btn} color={"default"} />
      </form>
    </div>
  );
};

export default Mainform;
