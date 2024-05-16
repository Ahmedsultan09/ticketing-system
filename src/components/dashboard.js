import { EngineeringOutlined, SupportAgentOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as Direct } from "react-router-dom";
function Dashboard() {
  const [engRows, setEngRows] = useState([]);
  const [operatorRows, setOperatorRows] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [openedTickets, setOpenedTickets] = useState(0);
  const [pendingTickets, setPendingTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);

  useEffect(() => {
    async function fetchAllTickets() {
      const response = await axios.get("http://localhost:3000/tickets");
      const allTicketsData = await response.data;
      setAllTickets(allTicketsData);
      const openedTickets = allTickets.filter(
        (ticket) => ticket.ticketType === "open"
      );
      const pendingTickets = allTickets.filter(
        (ticket) => ticket.ticketType === "pending"
      );
      const closedTickets = allTickets.filter(
        (ticket) => ticket.ticketType === "closed"
      );
      setOpenedTickets(openedTickets.length);
      setPendingTickets(pendingTickets.length);
      setClosedTickets(closedTickets.length);
    }
    fetchAllTickets();
  }, [allTickets]);
  useEffect(() => {
    async function fetchTopEngineers() {
      const response = await axios.get("http://localhost:3000/engineers");
      const engineers = response.data;
      const sortedEngineers = engineers.sort(
        (a, b) => b.tasks.length - a.tasks.length
      );
      const topEngineers = sortedEngineers.slice(0, 4);
      setEngRows(topEngineers);
    }
    fetchTopEngineers();
  }, []);
  useEffect(() => {
    async function fetchTopOperators() {
      const response = await axios.get("http://localhost:3000/operators");
      const operators = await response.data;
      const sortedOperators = operators.sort(
        (a, b) => b.ticketsCreated.length - a.ticketsCreated.length
      );
      const topOperators = sortedOperators.slice(0, 4);
      setOperatorRows(topOperators);
    }
    fetchTopOperators();
  }, []);

  const engColumns = [
    {
      field: "name",
      headerName: "Engineer Name",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <EngineeringOutlined />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "currentTasks",
      headerName: "Current Tasks",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "solvedTasks",
      headerName: "Solved Tasks",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
  ];
  const operatorsColumns = [
    {
      field: "name",
      headerName: "Operator Name",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SupportAgentOutlined />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "numberOfTicketsCreated",
      headerName: "Tickets Created",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <main className="w-full h-screen">
      <Typography className="w-full text-orange-600 h-16 p-3 flex items-center justify-start !font-bold">
        Tickets overview
      </Typography>
      <Box component="section" className="w-full h-1/4">
        <Box
          component="div"
          className="w-full h-full p-8 flex flex-grow gap-4 justify-center"
        >
          <Direct
            to="/tickets"
            className="w-1/5 h-4/5 rounded-2xl bg-pink-300 flex flex-col items-center justify-start p-5"
          >
            <Typography className="w-full !text-sm">Total Tickets</Typography>
            <Typography className="w-full !font-bold">
              {allTickets.length}
            </Typography>
          </Direct>

          <Direct
            to="/tickets/opened"
            className="w-1/5 h-4/5 rounded-2xl bg-blue-300 flex flex-col items-center justify-start p-5"
          >
            <Typography className="w-full !text-sm">Opened Tickets</Typography>
            <Typography className="w-full !font-bold">
              {openedTickets}
            </Typography>
          </Direct>

          <Direct
            to="/tickets/pending-tickets"
            className="w-1/5 h-4/5 rounded-2xl bg-orange-300 flex flex-col items-center justify-start p-5"
          >
            <Typography className="w-full !text-sm">
              On-Going Tickets
            </Typography>
            <Typography className="w-full !font-bold">
              {pendingTickets}
            </Typography>
          </Direct>
          <span className="w-1/5 h-4/5 rounded-2xl bg-green-300 flex flex-col items-center justify-start p-5">
            <Direct to="/tickets/closed" className="w-full !text-sm">
              Closed Tickets
            </Direct>
            <Typography className="w-full !font-bold">
              {closedTickets}
            </Typography>
          </span>
        </Box>
        <Box
          sx={{
            padding: "16px",
            borderBottom: "1px solid #ccc",
            paddingY: "10px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Engineer Workload Analysis
          </Typography>
        </Box>
        <DataGrid
          sx={{
            boxShadow: 2,
          }}
          rows={engRows}
          columns={engColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 4 },
            },
          }}
          autoHeight
          autoWidth
        />
        <Box
          sx={{
            padding: "16px",
            borderBottom: "1px solid #ccc",
            paddingY: "10px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Operators Workload Analysis
          </Typography>
        </Box>
        <DataGrid
          sx={{
            boxShadow: 2,
          }}
          rows={operatorRows}
          columns={operatorsColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 4 },
            },
          }}
          autoHeight
          autoWidth
        />
      </Box>
    </main>
  );
}

export default Dashboard;
