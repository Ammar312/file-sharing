import React from "react";
import img from "../assets/file.svg";
const Upload = () => {
  return (
    <div>
      <div className="p-8 bg-white max-w-2xl m-4 rounded-xl">
        <div className="  border-blue-400 border-2 border-dashed flex flex-col items-center justify-center gap-4 min-h-[250px]">
          <div className=" w-20 h-20">
            <img src={img} alt="upload image" />
          </div>
          <div>
            <p>Drop your Files here or, Browse</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
