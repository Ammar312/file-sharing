import React, { useCallback, useState } from "react";
import img from "../assets/file.svg";
import { useDropzone } from "react-dropzone";
const Upload = () => {
  const [files, setFiles] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Do something with the files
    setFiles(acceptedFiles[0].path);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <div className="p-8 bg-white max-w-2xl m-4 rounded-xl">
        <div
          className="  border-blue-400 border-2 border-dashed flex flex-col items-center justify-center gap-4 min-h-[250px]"
          {...getRootProps()}
        >
          <div className=" w-20 h-20">
            <img src={img} alt="upload image" />
          </div>
          <div>
            <input {...getInputProps()} />
            {
              isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drop your Files here or, Browse</p>
              )
              // <p>Drag 'n' drop some files here, or click to select files</p>
            }
            <div>{files}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
