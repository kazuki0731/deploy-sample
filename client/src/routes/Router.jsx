import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Main from "../components/Main";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/main">
          <Main />
        </Route>
      </Switch>
    </div>
  );
};

export default Router;
