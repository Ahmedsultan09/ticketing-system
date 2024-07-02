import React from "react";

function RedLabel({ text }) {
  return (
    <div className="nin-w-3/5 px-2 h-5 rounded-3xl text-white text-sm bg-red-600 flex items-center justify-center">
      {text}
    </div>
  );
}

export default RedLabel;
