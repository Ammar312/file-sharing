import React, { useCallback, useRef, useState } from "react";
import { Progress } from "antd";
import img from "../assets/file.svg";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const Upload = () => {
  const [files, setFiles] = useState("");
  const [isDrop, setIsDrop] = useState(false);
  const [progress, setProgress] = useState(0);

  const onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentCompleted);
  };
  const simulateSlowProgress = () => {
    const maxProgress = 100;
    const delayMs = 10; // Delay between each progress update in milliseconds

    for (let i = 0; i <= maxProgress; i++) {
      setTimeout(() => {
        setProgress(i);
      }, i * delayMs);
    }
  };

  const callApi = async (acceptedFiles) => {
    let sendTime = new Date().getTime();

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
          onUploadProgress: onUploadProgress,
        }
      );

      console.log(response.data);
      let receiveDate = new Date().getTime();
      const responseTimeMs = receiveDate - sendTime;
      console.log(`Took ${responseTimeMs} ms`);
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setProgress(0);
    setIsDrop(true);
    // Do something with the files
    simulateSlowProgress();
    setFiles(acceptedFiles[0].path);
    callApi(acceptedFiles);
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
            {/* <div>{files}</div> */}
          </div>
        </div>
        {isDrop && progress !== 100 ? (
          <div className=" mt-3">
            <Progress
              percent={progress}
              size={[400, 35]}
              strokeLinecap="butt"
              trailColor="#69b1ff17"
              strokeColor="blue"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Upload;
