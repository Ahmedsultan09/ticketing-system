import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link as Direct } from "react-router-dom";
import { useParams } from "react-router-dom";
function NavigationCard({ name, path, color, children }) {
  return (
    <Direct
      to={path}
      className="w-1/5 h-11 border border-gray-300 rounded-lg flex items-center flex-1 hover:scale-105 transition-all relative"
    >
      <div className="w-1/4 h-full"> </div>
      <div
        className={`w-3/4 h-full rounded-tl-3xl flex justify-around items-center cursor-pointer`}
      >
        <span className="w-1/2 h-full text-black font-bold flex items-center justify-center">
          {name}
        </span>
        <span className="w-1/2 h-full text-white font-bold flex items-center justify-center text-sm">
          <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
        </span>
      </div>
      <div className="absolute -top-3 -right-3">{children}</div>
    </Direct>
  );
}

export default NavigationCard;