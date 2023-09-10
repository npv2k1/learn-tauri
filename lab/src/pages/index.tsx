import { Button } from "@/components/ui/button";
import { useTauriCommand } from "@/hooks/tauri-command";
import { emit, listen } from "@tauri-apps/api/event";
import React, { useEffect, useRef, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { appConfigDir, dataDir } from "@tauri-apps/api/path";
import { fs } from "@tauri-apps/api";
import { getAppLayout } from "@/components/layouts";
import axios from "axios";
import * as cheerio from "cheerio";
import { ResponseType, fetch } from "@tauri-apps/api/http";

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

  // useEffect(() => {
  //   (async () => {
  //     const dataDirPath = await dataDir();
  //     const appConfigDirPath = await appConfigDir();
  //     console.log(
  //       "🚀 ~ file: index.tsx:30 ~ useEffect ~ appConfigDirPath:",
  //       appConfigDirPath
  //     );

  //     console.log(
  //       "🚀 ~ file: index.tsx:29 ~ useEffect ~ dataDirPath:",
  //       dataDirPath
  //     );

  //     const files = await fs.readDir(appConfigDirPath);
  //     console.log("🚀 ~ file: index.tsx:43 ~ files:", files);
  //   })();
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
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    contentRef.current && (contentRef.current.innerHTML = "loading");
    const dt = localStorage.getItem(keywords);
    if (dt) {
      contentRef.current && (contentRef.current.innerHTML = dt);
      return;
    }
    // lấy dữ liệu html
    // const steamUrl = `/api/dictionary?keywords=${keywords}`;
    // const res = await axios.get(steamUrl).then((res) => {
    //   return res.data;
    // });
    const steamUrl = `https://dictionary.cambridge.org/dictionary/english-vietnamese/${keywords}`;
    const html = await fetch<string>(steamUrl, {
      method: "GET",
      responseType: ResponseType.Text,
    }).then((res) => res.data);
    const $ = cheerio.load(html);
    contentRef.current &&
      (contentRef.current.innerHTML = $(".entry-body").html() || "");
    localStorage.setItem(keywords, $(".entry-body").html() || "");
    trackHistory(keywords);
  };

  const trackHistory = (newValue: string) => {
    // Step 1: Retrieve the existing array from localStorage
    const existingArrayString = localStorage.getItem("dictionary");

    // Step 2: Parse the retrieved JSON string into a JavaScript array
    let existingArray = [];

    if (existingArrayString) {
      try {
        existingArray = JSON.parse(existingArrayString);
      } catch (error) {
        console.error("Error parsing existing array:", error);
      }
    }

    // Step 3: Push the new value to the array
    existingArray.push(newValue);

    // Step 4: Convert the modified array back to a JSON string
    const modifiedArrayString = JSON.stringify(existingArray);

    // Step 5: Update localStorage with the modified JSON string
    localStorage.setItem("dictionary", modifiedArrayString);
  };

  const handleExport = async () => {
    // Step 1: Initialize an empty object to store the data
    const localStorageData: {
      [key: string]: any;
    } = {};

    // Step 2: Iterate through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key: string = localStorage.key(i) as string;
      const value = localStorage.getItem(key);

      // Store the key-value pair in the object
      localStorageData[key] = value;
    }

    // Step 3: Convert the object to a JSON string
    const jsonData = JSON.stringify(localStorageData);

    // Step 4: Create a Blob object containing the JSON string
    const blob = new Blob([jsonData], { type: "application/json" });

    // Step 5: Create a download link for the Blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "localStorageData.json"; // Set the desired file name

    // Step 6: Trigger a click event on the download link
    a.click();

    // Clean up by revoking the Object URL to free up memory
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-1 flex-col space-y-3  p-5 dark:bg-gray-700 dark:text-gray-100">
      <div className="flex flex-row items-center space-x-2">
        <div className="flex w-full rounded-md border border-gray-200 p-2 ">
          <input
            placeholder="Search..."
            className="w-full outline-none"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button onClick={handleExport} className="cursor-pointer">
          Export
        </button>
      </div>
      <div
        className="h-full min-h-0 flex-1 overflow-y-auto rounded-md bg-gray-100 p-5"
        ref={contentRef}
      ></div>
    </div>
  );
};
HomePage.getLayout = getAppLayout;

export default HomePage;
