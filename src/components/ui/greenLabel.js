import React from "react";

function GreenLabel({ text }) {
  return (
    <div className="min-w-3/5 px-2 h-5 rounded-3xl text-white text-sm bg-green-600 flex items-center justify-center">
      {text}
    </div>
  );
}

export default GreenLabel;