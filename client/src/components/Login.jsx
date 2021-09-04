import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const login = (data) => {
    axios.post("/login", data).then((res) => {
      if (res.data) {
        window.location.href = "/main";
      }
    });
  };

  return (
    <div>
      <h1>ログイン画面</h1>
      <form onSubmit={handleSubmit(login)}>
        <label htmlFor="name"></label>
        <input type="text" id="name" {...register("loginName")} />
        <br />
        <input type="submit" value="ログイン" />
      </form>
      <Link to="/main">移動</Link>
    </div>
  );
};

export default Login;
