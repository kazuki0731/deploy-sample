import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function Main() {
  const [datas, setDatas] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios.get("/api").then((res) => {
      setDatas(res.data.rows);
    });
  }, []);

  const submitUser = (data) => {
    axios.post("/regist", data).then((res) => {
      setDatas(res.data.rows);
    });
    reset();
  };

  return (
    <div>
      <h1>フロントエンド</h1>
      <form onSubmit={handleSubmit(submitUser)}>
        <label htmlFor="todo">テキスト: </label>
        <input type="text" id="todo" {...register("todo")} />
        <input type="submit" value="送信" />
      </form>
      <ul>
        {datas.map((data, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            {data.todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
