import React from "react";

const Form = () => {
  return (
    <div>
      <div className=" max-w-3xl rounded-2xl border-4 shadow-2xl p-12 h-80">
        <div className=" border-dotted flex flex-col border-red-500">
          <label htmlFor="file">
            <input type="file" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Form;
