import React from "react";
import logo from "../assets/share.png";

const Logo = () => {
  return (
    <div className="flex gap-x-2 items-center">
      <div className=" w-[80px]">
        <img src={logo} alt="logo" />
      </div>
      <p className="text-5xl font-black text-blue-600">SHARE'N</p>
    </div>
  );
};

export default Logo;
