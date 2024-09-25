import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link as Direct } from "react-router-dom";
import { useParams } from "react-router-dom";
function NavigationCard({ name, path, color, children }) {
  return (
    <div className="w-full h-11 border border-gray-300 rounded-lg flex items-center flex-1 relative">
      {" "}
      <Direct to={path} className="w-full">
        <div className="w-full h-full"> </div>
        <div
          className={`w-3/4 h-full rounded-tl-3xl flex justify-around items-center cursor-pointer`}
        >
          <span className="w-1/2 h-full text-black font-bold flex items-center justify-center">
            {name}
          </span>
          <span className="w-1/2 h-full text-black font-bold flex items-center justify-center text-sm">
            <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
          </span>
        </div>
      </Direct>
      <div className="absolute -top-3 -right-3 cursor-pointer">{children}</div>
    </div>
  );
}

export default NavigationCard;
