import React, { useCallback, useRef, useState } from "react";
import { Progress, message } from "antd";
import { CopyTwoTone } from "@ant-design/icons";
import img from "../assets/file.svg";
import { useDropzone } from "react-dropzone";
import axios from "axios";
const Upload = () => {
  const [file, setFile] = useState("");
  const [isDrop, setIsDrop] = useState(false);
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const copyLink = useRef(null);

  const onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentCompleted);
  };
  const simulateSlowProgress = async () => {
    const maxProgress = 100;
    const delayMs = 10; // Delay between each progress update in milliseconds

    for (let i = 0; i <= maxProgress; i++) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      setProgress(i);
    }
    setComplete(true);
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
      setFile(response.data.file);
      let receiveDate = new Date().getTime();
      const responseTimeMs = receiveDate - sendTime;
      console.log(`Took ${responseTimeMs} ms`);
      simulateSlowProgress();
    } catch (error) {
      console.log(error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setProgress(0);
    setIsDrop(true);
    setComplete(false);
    // Do something with the files

    // setFiles(acceptedFiles[0].path);
    callApi(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open, isDragAccept } =
    useDropzone({
      onDrop,
      noClick: true,
    });

  return (
    <div className=" flex border-2 border-emerald-300 justify-center items-center">
      <div className="p-8 bg-white w-[650px] m-4 rounded-xl">
        <div
          className="  border-blue-400 border-2 border-dashed flex flex-col items-center justify-center gap-4 min-h-[250px] mb-3"
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
          <div className="">
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
        {complete && (
          <div className=" flex flex-col gap-2 items-center w-full ">
            <div className=" font-medium">Link Expires in 24 hours</div>
            <div
              className=" border-dashed border-blue-400 border-2 p-2"
              ref={copyLink}
            >
              <span> {file}</span>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(
                    copyLink.current.firstChild.innerText
                  );
                  message.success(`Copied!`);
                }}
                className=" cursor-pointer text-[1.5rem] absolute right-[400px]"
              >
                <CopyTwoTone />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
