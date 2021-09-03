import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [datas, setDatas] = useState("");
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setDatas(data.datas));
  }, []);
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{datas}</p>
    </div>
  );
}

export default App;
