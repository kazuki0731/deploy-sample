import "./App.css";
import Login from "./components/Login";
import FormContext from "./context/ContextForm";
import { useState } from "react";
import Main from "./components/Main";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <FormContext>
      <div className="App">
        {isLogin ? <Main /> : <Login setIsLogin={setIsLogin} />}
      </div>
    </FormContext>
  );
}

export default App;
