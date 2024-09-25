import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Link as Direct, useParams } from "react-router-dom";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import { DataGrid } from "@mui/x-data-grid";
import GreenLabel from "src/ui/type-labels/greenLabel";
import YellowLabel from "src/ui/type-labels/yellowLabel";
import RedLabel from "src/ui/type-labels/redLabel";
import useFetchTasks from "src/hooks/useFetchTasks";
import Header from "src/ui/components/header";

function EngineerInfo({ name, phone, address, userName }) {
  const [rows, setRows] = useState([]);
  const [solvedTasks, setSolvedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

  const params = useParams();
  const tasks = useFetchTasks(params.engID);
  useEffect(() => {
    const solvedTasks = tasks.filter((task) => {
      return task.ticketType === "closed";
    });
    const pendingTasks = tasks.filter((task) => {
      return task.ticketType === "pending";
    });
    setRows(tasks);
    setSolvedTasks(solvedTasks);
    setPendingTasks(pendingTasks);
  }, [tasks]);
  const columns = [
    {
      field: "id",
      headerName: "Ticket Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      renderCell: (params) => (
        <Direct
          to={`/tickets/${params.value}`}
          className="w-full text-blue-500 flex items-center justify-center"
        >
          {params.value}
        </Direct>
      ),
      headerAlign: "center",
    },
    {
      field: "branch",
      headerName: "Branch",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <LocationOnOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "machineModel",
      headerName: "Machine Model",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <PrintOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SubtitlesOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "ticketDate",
      headerName: "Ticket Date",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <CalendarMonthOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "ticketType",
      headerName: "Ticket Type",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {params.value === "open" ? <GreenLabel text="open" /> : null}
          {params.value === "pending" ? <YellowLabel text="pending" /> : null}
          {params.value === "closed" ? <RedLabel text="closed" /> : null}
        </div>
      ),
    },
  ];
  return (
    <section className="w-full flex flex-col justify-around items-center ">
      {name && (
        <div className="w-full border-t border-muted-foreground">
          <Header title={`Here's information about ,${name}.`} />
        </div>
      )}

      <div className="w-full !h-1/6  flex flex-1 justify-center items-center gap-1  p-4">
        <div className="w-32 bg-blue-400 text-white flex flex-col justify-center items-center rounded-tl-xl">
          <span className="opacity-60 text-center !text-xs">Tasks</span>
          <CountUp end={tasks?.length} duration={2}></CountUp>
        </div>
        <div className="w-32 bg-green-400 text-white flex flex-col justify-center items-center  ">
          <span className="opacity-60 text-center !text-xs">Solved Issues</span>
          <CountUp end={solvedTasks?.length} duration={2}>
            15
          </CountUp>{" "}
        </div>
        <div className="w-32 bg-yellow-400 text-white flex flex-col justify-center items-center rounded-tr-xl ">
          <span className="opacity-60 text-center !text-xs">
            Pending Tickets
          </span>
          <CountUp end={pendingTasks?.length} duration={2}>
            15
          </CountUp>{" "}
        </div>
      </div>
      <div className="border-t mt-3 h-1/3 border-gray-400 rounded-xl shadow-md lg:w-full md:w-full sm:w-full">
        {" "}
        <div className="w-full h-1/4 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            Full Name: <span className="font-bold opacity-100">{name}</span>
          </Typography>
        </div>
        <div className="w-full h-1/4 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            User Name: <span className="font-bold opacity-100">{userName}</span>
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
      <div className="w-full">
        <DataGrid
          sx={{
            boxShadow: 2,
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          getRowId={(row) => row.id}
          autoHeight
          autoWidth
        />
      </div>
    </section>
  );
}

export default EngineerInfo;
