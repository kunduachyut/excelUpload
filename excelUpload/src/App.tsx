'use strict';
import React, { useState } from "react";
import "./App.css";
import { createSheetURL } from "./firebase/UploadSheet.ts";
import toast, { Toaster } from "react-hot-toast";
// import excelToJson from "convert-excel-to-json";
import fs from "fs";
// import convertExcelToJson, * as convertExcel from "convert-excel-to-json";
import * as convertExcel from "convert-excel-to-json";
// const excelToJson = require('convert-excel-to-json');
 

const App: React.FC = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [excelURL, setExcelURL] = useState<string>("");
  const [filepath, setFilepath] = useState("");
  const defaultBlob = new Blob(["Default Content"], { type: "text/plain" });

  const [imgFile, setImageFile] = useState<
    Blob | Uint8Array | ArrayBuffer | any
  >(defaultBlob);

  const getFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilepath(event.target.files![0].webkitRelativePath)
    setVisibility(false);
    const targetFiles = event.target.files;
    if (targetFiles) {
      event.onload = (e) => {
        const data = e.target.result;
        // Now you can use 'data' for further processing
        convertExcelToJson(data);
      };
      const result = excelToJson({
        // sourceFile: fs.readFileSync(filepath)
        source:fs.readFileSync(filepath)
    });
    console.log(result)
      setImageFile(targetFiles[0]);
      console.log(targetFiles[0].type);
    }
  };

  const uploadSheet = async () => {
    try {
      const URL: any = await createSheetURL(imgFile);
      setExcelURL(URL);
      setVisibility(true);
      console.log("imgURL", URL);
      toast.success("Successfully uploaded!");
    } catch (error) {
      console.log("Error in uploading image", error);
    }
  };

  return (
    <div>
      <h1>Excel Upload</h1>
      <div>
        <label
          htmlFor="preview"
          style={{
            fontSize: "1.25rem",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            color: "#718096",
          }}
        >
          {" "}
          Preview Image
        </label>
        <input
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          type="file"
          id="preview"
          onChange={(event) => getFile(event)}
          alt=""
          placeholder="Submit image"
          style={{
            border: "2px solid #4299e1",
            backgroundColor: "#ffffff",
            width: "14rem",
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            borderRadius: "0.375rem",
            color: "#4299e1",
          }}
        />
      </div>
      <button
        style={{
          border: "2px solid #4299e1",
          backgroundColor: "#ffffff",
          width: "14rem",
          paddingLeft: "0.25rem",
          paddingRight: "0.25rem",
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem",
          borderRadius: "0.375rem",
          color: "#4299e1",
        }}
        onClick={uploadSheet}
      >
        Upload
      </button>
      {visibility && (
        <a
          href={`${excelURL}`}
          style={{
            border: "2px solid #4299e1",
            backgroundColor: "#ffffff",
            width: "14rem",
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
            borderRadius: "0.375rem",
            color: "#4299e1",
            marginLeft: "1.5rem",
          }}
        >
          View Sheet
        </a>
      )}
      <Toaster />
    </div>
  );
};

export default App;
