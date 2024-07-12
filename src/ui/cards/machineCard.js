import { Link as Direct } from "react-router-dom";
import RedLabel from "../type-labels/redLabel";
import GreenLabel from "../type-labels/greenLabel";
import BusinessIcon from "@mui/icons-material/Business";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PrintIcon from "@mui/icons-material/Print";

export default function MachineCard({
  serialNumber,
  qrCode,
  brand,
  client,
  model,
  area,
  branch,
  property,
}) {
  return (
    <div className="lg:w-[280px] sm:w-1/2 h-56 rounded-2xl shadow-xl shadow-slate-200 p-2">
      <div className="h-full">
        <div className="lg:w-full h-1/5 flex lg:flex-row md:w-full md:flex-row flex-col items-center justify-center lg:justify-between px-2">
          <Direct
            to={`/machines/${serialNumber}`}
            className="text-blue-500 w-auto px-2  border-b border-r border-gray-200 uppercase"
          >
            {serialNumber}
          </Direct>
          <div className="leading-none lg:w-auto w-4/5">
            {property ? (
              <GreenLabel text="property" />
            ) : (
              <RedLabel text="non-ownership" />
            )}
          </div>
        </div>

        <div className="w-full flex flex-row flex-wrap justify-center items-center h-4/5">
          {" "}
          <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
            {" "}
            <span className="font-bold">Client: </span>
            {client} <BusinessIcon className="!text-lg" />
          </div>
          <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
            {" "}
            <span className="font-bold">QR Code: </span>
            {qrCode} <QrCode2Icon className="!text-lg" />
          </div>
          <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
            <span className="font-bold">Area: </span>
            {area} <LocationOnIcon className="!text-lg" />
          </div>
          <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
            <span className="font-bold">Branch: </span>
            {branch} <LocationCityIcon className="!text-lg" />
          </div>
          <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
            {" "}
            <span className="font-bold">Model: </span>
            {model} <PrintIcon className="!text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
