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
import useFetchSpecificOperator from "src/hooks/useFetchSpecificOperator";
import useFetchTickets from "src/hooks/useFetchTickets";
import Header from "src/ui/components/header";
import CreateIssueModal from "./createIssueModal";

export default function OperatorTickets({ type, operatorId = undefined }) {
  const [rows, setRows] = useState([]);
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
  ];
  const specificOperator = useFetchSpecificOperator(operatorId);
  const tickets = useFetchTickets();
  useEffect(() => {
    const filteredTickets = tickets.filter((ticket) => {
      return ticket?.client === specificOperator.client;
    });
    setRows(filteredTickets);
  }, [specificOperator, tickets]);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <div className="border-t border-gray-400">
        <Header
          title={`Welcome, ${specificOperator?.name}!`}
          description={`Here you can find all tickets for ${specificOperator?.client}`}
          btnComponent={<CreateIssueModal btnOnly={true} />}
        />
      </div>

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
