import Login from "./page/Login";
import FormContext from "./context/ContextForm";
import { useState } from "react";
import Main from "./page/Main";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
});

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const classes = useStyles();

  return (
    <FormContext>
      <div className={classes.container}>
        {isLogin ? <Main /> : <Login setIsLogin={setIsLogin} />}
      </div>
    </FormContext>
  );
}

export default App;
