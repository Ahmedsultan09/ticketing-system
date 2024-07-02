import React from "react";

function BlueLabel({ text }) {
  return (
    <div className="min-w-3/5 px-2 h-5 rounded-3xl text-sm  bg-blue-500 text-white flex items-center justify-center">
      {text}
    </div>
  );
}

export default BlueLabel;
