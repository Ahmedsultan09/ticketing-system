import { Link as Direct } from "react-router-dom";
import RedLabel from "../type-labels/redLabel";
import GreenLabel from "../type-labels/greenLabel";
import BusinessIcon from "@mui/icons-material/Business";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PrintIcon from "@mui/icons-material/Print";
import SpeedIcon from "@mui/icons-material/Speed";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FilterTiltShiftIcon from "@mui/icons-material/FilterTiltShift";
import { Button } from "@mui/material";
export default function MachineCard({
  serialNumber,
  qrCode,
  brand,
  client,
  model,
  area,
  branch,
  property,
  machineType,
  meterReading,
  status,
  deletable,
  handleMachineSerialNumber,
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
              <GreenLabel text="Big Data's" />
            ) : (
              <RedLabel text={client} />
            )}
          </div>
        </div>

        <div className="w-full flex flex-row flex-wrap justify-center items-center h-4/5">
          {" "}
          {client !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              {" "}
              <span className="font-bold">Client: </span>
              {client} <BusinessIcon className="!text-lg" />
            </div>
          )}
          {qrCode !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              <span className="font-bold">QR Code: </span>
              {qrCode} <QrCode2Icon className="!text-lg" />
            </div>
          )}
          {branch !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              <span className="font-bold">Branch: </span>
              {branch} <LocationCityIcon className="!text-lg" />
            </div>
          )}
          {brand !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              {" "}
              <span className="font-bold">Brand: </span>
              {brand} <PrintIcon className="!text-lg" />
            </div>
          )}
          {model !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              {" "}
              <span className="font-bold">Model: </span>
              {model} <FormatColorFillIcon className="!text-lg" />
            </div>
          )}
          {machineType !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              {" "}
              <span className="font-bold">Type: </span>
              {machineType} <FilterTiltShiftIcon className="!text-lg" />
            </div>
          )}
          {status !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              {" "}
              <span className="font-bold">Status: </span>
              {status === "solved" && "Stable"}{" "}
              {status === "spare-parts" && "Spare Parts"}{" "}
              {status === "scrapped" && "Scrapped / Replacement"}{" "}
              <ShowChartIcon className="!text-lg" />
            </div>
          )}
          {meterReading !== undefined && (
            <div className="w-11/12 rounded-2xl text-nowrap text-xs bg-slate-200 px-2">
              {" "}
              <span className="font-bold">Meter reading: </span>
              {meterReading} <SpeedIcon className="!text-lg" />
            </div>
          )}
        </div>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleMachineSerialNumber(serialNumber)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
