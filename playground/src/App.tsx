import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  async function greet() {
    await invoke("put_db", { name });
  }

  async function put() {
    await invoke("put_db", { key, value });
  }

  async function get() {
    await invoke("get_db", { key }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="container">
      <div>
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          type="text"
          placeholder="key"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="value"
        />
      </div>
      <div>
        <button onClick={put}>Put</button>
        <button onClick={get}>Get</button>
      </div>
    </div>
  );
}

export default App;
