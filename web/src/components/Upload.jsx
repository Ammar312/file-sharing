import React, { useCallback, useRef, useState } from "react";
import { Progress } from "antd";
import img from "../assets/file.svg";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const Upload = () => {
  const [files, setFiles] = useState("");
  const [isDrop, setIsDrop] = useState(false);

  const callApi = async () => {
    const formData = new FormData();
    formData.append("myFile", acceptedFiles[0]);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Do something with the files
    setFiles(acceptedFiles[0].path);
    callApi();
  }, []);

  const { getRootProps, getInputProps, isDragActive, open, isDragAccept } =
    useDropzone({
      onDrop,
      noClick: true,
    });
  return (
    <div>
      <div className="p-8 bg-white max-w-2xl m-4 rounded-xl">
        <div
          className="  border-blue-400 border-2 border-dashed flex flex-col items-center justify-center gap-4 min-h-[250px]"
          {...getRootProps()}
        >
          <div className=" w-20 h-20">
            <img
              src={img}
              alt="upload image"
              className={isDragActive ? ` translate-x-8 transition-all` : ""}
            />
          </div>
          <div>
            <input {...getInputProps()} />
            {
              isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  Drop your Files here or,{" "}
                  <span
                    onClick={open}
                    className=" text-blue-300 cursor-pointer"
                  >
                    Browse
                  </span>
                </p>
              )
              // <p>Drag 'n' drop some files here, or click to select files</p>
            }
            <div>{files}</div>
            <Progress percent={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
