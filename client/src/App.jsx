import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div className="App">
      <h1>フロントエンド</h1>
    </div>
  );
}

export default App;
