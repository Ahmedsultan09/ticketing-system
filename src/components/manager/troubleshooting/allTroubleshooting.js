import { DataGrid } from "@mui/x-data-grid";
import { Link as Direct } from "react-router-dom";
import CreateTicketModal from "../tickets/createIssueModal";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Tickets({ type }) {
  const [rows, setRows] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const columns = [
    {
      field: "id",
      headerName: "Issue Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      renderCell: (params) => (
        <Direct
          to={`/troubleshooting/${params.value}`}
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
      field: "issueDate",
      headerName: "Issue Date",
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
      field: "operator",
      headerName: "Solved By",
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

    ...(isManager
      ? [
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
    async function fetchTroubleshooting() {
      const response = await axios.get("http://localhost:3000/troubleshooting");
      const issues = await response.data;

      setRows(issues);
    }
    fetchTroubleshooting();
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <CreateTicketModal type={type} troubleshooting={true} />
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
