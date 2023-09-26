import React from "react";
import logo from "../assets/share.png";

const Logo = () => {
  return (
    <div className="flex gap-x-2 items-center">
      <div className=" w-[80px]">
        <img src={logo} alt="logo" />
      </div>
      <p className="text-5xl font-bold text-blue-800 font-serif ">SHARE'N</p>
    </div>
  );
};

export default Logo;
