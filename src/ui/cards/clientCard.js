import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function ClientCard({ name, logo, clientId, color }) {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "from-green-500 to-green-800";
      case "red":
        return "from-red-400 to-red-700";
      case "violet":
        return "from-violet-400 to-purple-900";
      case "blue":
        return `from-blue-400 to-blue-800`;

      default:
        return `from-${color}-400 to-${color}-900`;
    }
  };
  return (
    <div className="w-1/5 h-11 border border-gray-300 rounded-lg flex items-center flex-1 overflow-hidden hover:scale-105 transition-all">
      <div className="w-1/4 h-full">
        {" "}
        <img
          src={logo}
          alt="qnb logo"
          className="object-contain h-full w-full"
        />
      </div>
      <div
        className={`w-3/4 h-full rounded-tl-3xl ${`bg-gradient-to-tr  ${getColorClasses()} `} flex justify-around items-center cursor-pointer`}
      >
        <span className="w-1/2 h-full text-white font-bold flex items-center justify-center">
          {name}
        </span>
        <span className="w-1/2 h-full text-white font-bold flex items-center justify-center text-sm">
          <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
        </span>
      </div>
    </div>
  );
}

export default ClientCard;
