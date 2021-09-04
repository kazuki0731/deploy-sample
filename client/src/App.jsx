import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data[0].title);
      });
  }, []);
  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
