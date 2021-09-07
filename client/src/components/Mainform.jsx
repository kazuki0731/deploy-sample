import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonSource from "./ButtonSource";
import TextSource from "./TextSource";

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
  const { handleSubmit, submitTodo, register } = props;
  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(submitTodo)}>
        <TextSource label={"Todoを入力"} register={register} />
        <ButtonSource classes={classes.btn} color={"default"} />
      </form>
    </div>
  );
};

export default Mainform;
