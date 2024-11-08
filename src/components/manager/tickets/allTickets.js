import { DataGrid } from "@mui/x-data-grid";
import { Link as Direct } from "react-router-dom";
import { useEffect, useState } from "react";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GreenLabel from "../../../ui/type-labels/greenLabel";
import YellowLabel from "../../../ui/type-labels/yellowLabel";
import RedLabel from "../../../ui/type-labels/redLabel";
import BlueLabel from "../../../ui/type-labels/blueLabel";
import GreyLabel from "../../../ui/type-labels/greyLabel";
import PurpleLabel from "../../../ui/type-labels/purpleLabel";
import axiosInstance from "../../../api/axiosInstance";
import CreateIssueModal from "./createIssueModal";

export default function Tickets({ type }) {
  const [rows, setRows] = useState([]);
  const [isManager] = useState(true);
  const columns = [
    {
      field: "id",
      headerName: "T/N",
      width: 70,
      minWidth: 60,
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
      field: "client",
      headerName: "Client",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <BusinessIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
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
    {
      field: "status",
      headerName: "Status",
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
          {params.value === "solved" ? <GreenLabel text="solved" /> : null}
          {params.value === "spare-parts" ? (
            <BlueLabel text="spare parts" />
          ) : null}
          {params.value === "scrabed" ? <RedLabel text="scarbed" /> : null}
          {params.value === "on-going" ? <GreyLabel text="assigned" /> : null}
          {params.value === "not-assigned-yet" ? (
            <PurpleLabel text="not assigned yet" />
          ) : null}
        </div>
      ),
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          {params.value !== "" && <EngineeringIcon />}{" "}
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "operator",
      headerName: "Operator",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SupervisedUserCircleOutlined />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
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
          {params.value === "normal" ? <YellowLabel text="Normal" /> : null}
          {params.value === "high" ? <RedLabel text="High" /> : null}
        </div>
      ),
    },

    ...(isManager
      ? [
          {
            field: "assigningDelay",
            headerName: "Assigning Delay",
            flex: 1,
            width: 130,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
          },
          {
            field: "operatorDelay",
            headerName: "Operator Delay",
            flex: 1,
            width: 130,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
          },
        ]
      : []),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/tickets");
        const allTickets = await response.data;
        if (type === "opened") {
          const openedTickets = allTickets.filter(
            (ticket) => ticket.ticketType === "open"
          );
          setRows(openedTickets);
        } else if (type === "pending") {
          const pendingTickets = allTickets.filter(
            (ticket) => ticket.ticketType === "pending"
          );
          setRows(pendingTickets);
        } else if (type === "closed") {
          const closedTicket = allTickets.filter(
            (ticket) => ticket.ticketType === "closed"
          );
          setRows(closedTicket);
        } else {
          setRows(allTickets);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <CreateIssueModal type={type} />
      <DataGrid
        sx={{
          boxShadow: 2,
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        autoHeight
        autoWidth
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
