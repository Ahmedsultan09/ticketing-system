import { Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import EngineerSpareParts from "./engineerSpareParts";

function EngineerInfo({ name, phone, address, email }) {
  return (
    <section className="w-5/6 lg:w-full min-h-screen md:w-full sm:w-full flex flex-col justify-around">
      <div className="border-t mt-3 h-1/3 border-gray-400 rounded-xl shadow-md lg:w-full md:w-full sm:w-full">
        {" "}
        <div className="w-full h-1/4 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            Full name: <span className="font-bold opacity-100">{name}</span>
          </Typography>
        </div>
        <div className="w-full h-1/4 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            E-mail: <span className="font-bold opacity-100">{email}</span>
          </Typography>
        </div>
        <div className="w-full h-1/4 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            Address: <span className="font-bold opacity-100">{address}</span>
          </Typography>
        </div>
        <div className="w-full h-1/4 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            Telephone: <span className="font-bold opacity-100">{phone}</span>
          </Typography>
        </div>
      </div>
      <div className="w-full h-1/3  flex flex-1 justify-center items-center gap-4 lg:gap-8  p-4">
        <div className="w-32 h-32 rounded-full border-2 border-double border-sky-500 bg-transparent flex flex-col justify-center items-center">
          <span className="opacity-60 text-center">Current Tasks</span>
          <CountUp end={15} duration={5}>
            15
          </CountUp>
        </div>
        <div className="w-32 h-32 rounded-full border-2 border-double border-green-500 bg-transparent flex flex-col  justify-center items-center">
          <span className="opacity-60 text-center">Solved Issues</span>
          <CountUp end={60} duration={5}>
            15
          </CountUp>{" "}
        </div>
        <div className="w-32 h-32 rounded-full border-2 border-double border-yellow-500 bg-transparent flex flex-col  justify-center items-center">
          <span className="opacity-60 text-center">Pending Tickets</span>
          <CountUp end={10} duration={5}>
            15
          </CountUp>{" "}
        </div>
      </div>
      <div className="w-full h-1/3 border border-gray-300 rounded-xl">
        <Typography
          variant="h5"
          className="w-full h-16 flex justify-center items-center"
        >
          Manage current spare parts
        </Typography>
        <EngineerSpareParts />
      </div>
    </section>
  );
}

export default EngineerInfo;
