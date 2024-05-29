import React from "react";

function YellowLabel({ text }) {
  return (
    <div className="nin-w-3/5 h-5 px-2 rounded-3xl text-black text-sm border border-yellow-500 flex items-center justify-center">
      {text}
    </div>
  );
}

export default YellowLabel;
