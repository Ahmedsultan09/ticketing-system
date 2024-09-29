import React from "react";
import { Link as Direct } from "react-router-dom";
import { Card, CardContent } from "../../ui/components/card";
import { MapPin } from "lucide-react";
function NavigationCard({ name, path, color }) {
  return (
    <Card className="w-full max-w-3xl overflow-hidden">
      <CardContent className="p-0">
        <Direct
          to={path}
          className={`relative h-48 bg-gradient-to-r ${
            color === "clients"
              ? "from-emerald-500 via-teal-500 to-cyan-500"
              : "from-orange-500-500 via-yellow-500 to-red-500"
          } flex overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="pattern"
                  patternUnits="userSpaceOnUse"
                  width="40"
                  height="40"
                  patternTransform="rotate(45)"
                >
                  <rect width="100%" height="100%" fill="none" />
                  <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
          <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-yellow-300 opacity-30 blur-2xl"></div>
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-pink-300 opacity-30 blur-2xl"></div>
          <div className="flex-1 flex flex-col justify-center p-8 relative z-10">
            <h2 className="text-4xl font-bold text-white mb-2">{name}</h2>
            <p className="text-emerald-100 text-lg">Governorate</p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-end p-8 relative z-10">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 text-right">
              <p className="text-emerald-100 text-sm mb-1">Population</p>
              <p className="text-white text-2xl font-semibold">15</p>
            </div>
            <div className="mt-4 flex items-center text-emerald-100">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{name}</span>
            </div>
          </div>
        </Direct>
      </CardContent>
    </Card>
  );
}

export default NavigationCard;
