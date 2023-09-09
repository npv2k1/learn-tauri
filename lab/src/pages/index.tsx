import { useTauriCommand } from "@/hooks/tauri-command";
import React from "react";

const HomePage = () => {
  const [doCommand] = useTauriCommand();

  return (
    <div>
      <button
        onClick={() =>
          doCommand("greet", { name: "nguyen" }).then((res) => console.log(res))
        }
      >
        Click
      </button>
    </div>
  );
};

export default HomePage;
