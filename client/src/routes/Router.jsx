import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Main from "../components/Main";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Main} />
      </Switch>
    </div>
  );
};

export default Router;
