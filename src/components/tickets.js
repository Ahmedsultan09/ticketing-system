import { DataGrid } from "@mui/x-data-grid";
import { Link as Direct } from "react-router-dom";
import CreateTicketModal from "./createTicketModal";
import axios from "axios";
import { useEffect, useState } from "react";

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
    field: "machineModel",
    headerName: "Machine Model",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "serialNumber",
    headerName: "Serial Number",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "branch",
    headerName: "Branch Name",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ticketDate",
    headerName: "Ticket Date",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ticketType",
    headerName: "Ticket Type",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "assignedTo",
    headerName: "Assigned To",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "operator",
    headerName: "Operator",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "delay",
    headerName: "Delay",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "client",
    headerName: "Client",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
];

const smallScreenColumns = [
  {
    field: "id",
    headerName: "Ticket Number",
    flex: 1,
    minWidth: 140,
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
    field: "serialNumber",
    headerName: "Serial Number",
    flex: 1,
    width: 130,
    minWidth: 100,
    type: "number",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "ticketDate",
    headerName: "Ticket Date",
    flex: 1,
    width: 130,
    minWidth: 100,
  },
  {
    field: "ticketDate",
    headerName: "Ticket Date",
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "client",
    headerName: "Client",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    width: 130,
    minWidth: 100,
    align: "center",
    headerAlign: "center",
  },
];

export default function Tickets() {
  const isSmallScreen = window.innerWidth <= 768;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tickets");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <CreateTicketModal />
      <DataGrid
        sx={{
          boxShadow: 2,
        }}
        rows={rows}
        columns={isSmallScreen ? smallScreenColumns : columns}
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
