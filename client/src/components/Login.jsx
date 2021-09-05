import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const login = (data) => {
    axios.post("/login", data).then((res) => {
      if (res.data) {
        setIsLogin(true);
      }
    });
  };

  return (
    <div>
      <h1>ログインページ</h1>
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
  );
};

export default Login;
