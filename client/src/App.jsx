import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState([]);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const getUser = () => {
    axios.get("/user").then((res) => {
      name.push(res.data.name);
      setName([...name]);
    });
  };

  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{message}</p>
      <button onClick={getUser}>表示</button>
      <p>{name}</p>
    </div>
  );
}

export default App;
