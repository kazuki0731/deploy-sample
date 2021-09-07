import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { createContext } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const FormContext = createContext();

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const login = (data) => {
    axios.post("/login", data).then((res) => {
      if (res.data) {
        setIsLogin(true);
      }
    });
  };

  return (
    <div>
      <FormContext.Provider>
        <h1>トップページ</h1>
        <button type="button" onClick={handleOpen}>
          始める
        </button>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <form onSubmit={handleSubmit(login)}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register("loginName")} />
                <br />
                <input type="submit" value="ログイン" />
              </form>
              {isLogin && (
                <div>
                  <p>ログインできました</p>
                  <Link to="/main">メインページへ</Link>
                </div>
              )}
            </div>
          </Fade>
        </Modal>
      </FormContext.Provider>
    </div>
  );
};

export default Login;
