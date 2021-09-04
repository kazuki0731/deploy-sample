import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const getUser = () => {
    axios.get("/api").then((res) => {
      setData(res.data.data[0].text);
    });
  };
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <button onClick={getUser}>ユーザー取得</button>
      <p>{data}</p>
    </div>
  );
}

export default App;
