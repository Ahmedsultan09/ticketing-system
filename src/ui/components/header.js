import React from "react";
import { Link as Direct } from "react-router-dom";

function Header({ title = "", description, btnText, direction = "/" }) {
  return (
    <header className="text-primary-foreground px-4 py-6 sm:px-6 md:px-8 bg-gray-800 text-white">
      <div className="container mx-auto">
        <div className="flex lg:flex-row flex-col items-center justify-between">
          <div className="flex justify-start items-start flex-col lg:mb-0 mb-3">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-primary-foreground/80 mt-2">
              {description}
            </p>
          </div>
          {btnText && (
            <Direct
              to={direction}
              className="w-fit  px-7 h-fit bg-white text-black rounded-lg text-sm py-1 font-bold"
            >
              {btnText}
            </Direct>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
