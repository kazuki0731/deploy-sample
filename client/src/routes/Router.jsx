import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Main from "../components/Main";
import FormContext from "../context/ContextForm";

const Router = () => {
  return (
    <div>
      <FormContext>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Main} />
      </Switch>
      </FormContext>

    </div>
  );
};

export default Router;
