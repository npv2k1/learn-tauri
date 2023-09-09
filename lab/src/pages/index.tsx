import { Button } from "@/components/ui/button";
import { useTauriCommand } from "@/hooks/tauri-command";
import { emit, listen } from "@tauri-apps/api/event";
import React, { useEffect, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readBinaryFile } from "@tauri-apps/api/fs";

const HomePage = () => {
  const [doCommand] = useTauriCommand();

  // useEffect(() => {
  //   let unlisten = () => {};
  //   const handleEvent = async () => {
  //     unlisten = await listen("click", (event) => {
  //       console.log(event);
  //       // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
  //       // event.payload is the payload object
  //     });
  //   };
  //   handleEvent();
  //   return () => {
  //     unlisten();
  //   };
  // }, []);

  const [image, setIamge] = useState("");

  const openFile = async () => {
    console.log("open file");
    // Open a selection dialog for image files
    const selected = await open({
      multiple: true,
      filters: [
        {
          name: "Image",
          extensions: ["png", "jpeg"],
        },
      ],
    });
    console.log("🚀 ~ file: index.tsx:37 ~ openFile ~ selected:", selected);
    if (!selected) return;
    const contents = await readBinaryFile(selected[0]);
    console.log("🚀 ~ file: index.tsx:41 ~ openFile ~ contents:", contents);
    // setIamge(selected[0]);

    const imageBlob = new Blob([contents], { type: "image/png" });
    const imageUrl = URL.createObjectURL(imageBlob);
    console.log("🚀 ~ file: index.tsx:46 ~ openFile ~ imageUrl:", imageUrl);
    setIamge(imageUrl);

    if (Array.isArray(selected)) {
      // user selected multiple files
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
  };

  return (
    <div className="p-2">
      <div>
        <img src={image} alt="selected image" />
      </div>
      <Button
        className="bg-red-200 rounded-lg"
        onClick={() =>
          doCommand("greet", { name: "nguyen" }).then((res) => console.log(res))
        }
      >
        Click
      </Button>

      <div className="flex space-x-2 bg-gray-100 p-5">
        <Button
          className="bg-gray-200"
          onClick={async () =>
            // emits the `click` event with the object payload
            await emit("click", {
              theMessage: "Tauri is awesome!",
            })
          }
        >
          Send Event
        </Button>
        <Button
          className="bg-gray-200"
          onClick={async () =>
            // emits the `click` event with the object payload
            openFile()
          }
        >
          Open File
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
