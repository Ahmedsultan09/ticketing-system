import React from "react";

function PurpleLabel({ text }) {
  return (
    <div className="min-w-3/5 px-2 h-5 rounded-3xl text-white text-sm bg-purple-800 flex items-center justify-center">
      {text}
    </div>
  );
}

export default PurpleLabel;
