import { Box, Button, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import EditIcon from "@mui/icons-material/Edit";
import EditOperatorModal from "./editOperatorModal";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Link as Direct } from "react-router-dom";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import GreenLabel from "../../ui/greenLabel";
import YellowLabel from "../../ui/yellowLabel";
import RedLabel from "../../ui/redLabel";

function OperatorInfo({
  id,
  name,
  phone,
  address,
  email,
  createdTickets,
  client,
}) {
  const [clientModal, setOpenClientModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [rows, setRows] = useState([]);
  function handleOpenEditClient() {
    setOpenClientModal(true);
  }
  function handleCloseEditClient() {
    setOpenClientModal(false);
  }

  useEffect(() => {
    async function fetchAllTicketsCreated() {
      const response = await axios.get("http://localhost:3000/operators");
      const allOperators = await response.data;
      const SpecificOperator = allOperators.find((operator) => {
        return parseInt(operator.id) === parseInt(id);
      });
      const allTickets = SpecificOperator.ticketsCreated;
      setTickets(allTickets);
    }
    fetchAllTicketsCreated();
  }, [id]);

  useEffect(() => {
    async function fetchTicketsDetails() {
      const response = await axios.get("http://localhost:3000/tickets");
      const allTickets = await response.data;
      const ticketsDetails = [];
      for (let i = 0; i < allTickets.length; i++) {
        for (let j = 0; j < tickets.length; j++) {
          if (parseInt(allTickets[i].id) === parseInt(tickets[j])) {
            ticketsDetails.push(allTickets[i]);
          }
        }
      }
      const sortedTickets = ticketsDetails.sort((a, b) => {
        const dateA = new Date(a.ticketDate);
        const dateB = new Date(b.ticketDate);
        return dateB - dateA; // Sort from latest to earliest
      });

      setFilteredTickets(sortedTickets.splice(0, 5));
    }
    fetchTicketsDetails();
  }, [tickets]);

  useEffect(() => {
    if (filteredTickets.length > 0) {
      const rows = filteredTickets.map((ticket) => ({
        id: ticket.id, // Ensure each row has a unique id
        branch: ticket.branch,
        machineModel: ticket.machineModel,
        serialNumber: ticket.serialNumber,
        ticketDate: ticket.ticketDate,
        ticketType: ticket.ticketType,
      }));
      setRows(rows);
    }
  }, [filteredTickets]);

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

  const IconButton = styled(Button)(({ theme }) => ({
    height: "40px",
    minWidth: "40px",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
  }));
  return (
    <section className="w-5/6 lg:w-full md:w-full sm:w-full">
      <div className="border-t mt-3 h-1/3 border-gray-400 rounded-xl shadow-md w-full">
        {" "}
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            Full name: <span className="font-bold opacity-100">{name}</span>
          </Typography>
        </div>
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            E-mail: <span className="font-bold opacity-100">{email}</span>
          </Typography>
        </div>
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            Address: <span className="font-bold opacity-100">{address}</span>
          </Typography>
        </div>
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <Typography className="w-auto h-full opacity-60 font-normal mr-1">
            Phone: <span className="font-bold opacity-100">{phone}</span>
          </Typography>
        </div>
        {client ? (
          <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
            <Typography className="w-full h-full opacity-60 font-normal mr-1 flex flex-row justify-between items-center">
              <span className="font-bold opacity-100">
                <span className="opacity-60 w-1/2">Client: </span>
                {client}
              </span>{" "}
              <span className="w-1/2 flex justify-end">
                {" "}
                <IconButton
                  variant="contained"
                  color="secondary"
                  className="h-7"
                  size="small"
                  onClick={() => handleOpenEditClient(client)}
                >
                  <EditIcon />
                </IconButton>
              </span>
            </Typography>
          </div>
        ) : (
          <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
            <Typography className="w-auto h-full opacity-60 font-normal mr-1">
              Client:{" "}
              <span className="font-bold opacity-100">Not yet assigned</span>
            </Typography>
          </div>
        )}
      </div>
      <div className="w-full h-1/3 flex flex-1 justify-center items-center gap-4 lg:gap-8 p-4">
        <div className="w-32 h-32 rounded-full border-2 border-double border-sky-500 bg-transparent flex flex-col justify-center items-center">
          <span className="opacity-60 text-center">Created Tickets</span>
          <CountUp end={createdTickets.length} duration={5}></CountUp>
        </div>
        <div className="w-32 h-32 rounded-full border-2 border-double border-green-500 bg-transparent flex flex-col  justify-center items-center">
          <span className="opacity-60 text-center">Solved Tickets</span>
          <CountUp end={20} duration={5}></CountUp>{" "}
        </div>
        <div className="w-32 h-32 rounded-full border-2 border-double border-yellow-500 bg-transparent flex flex-col  justify-center items-center">
          <span className="opacity-60 text-center">Pending Tickets</span>
          <CountUp end={19} duration={5}></CountUp>{" "}
        </div>
      </div>
      <Box sx={{ width: "100%" }} className="border border-gray-300 h-auto">
        <Typography
          variant="h6"
          className="w-full h-14 flex justify-center items-center"
        >
          Recently created tickets
        </Typography>
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
      </Box>

      <EditOperatorModal
        open={clientModal}
        handleOpen={handleOpenEditClient}
        handleClose={handleCloseEditClient}
        client={client}
      />
    </section>
  );
}

export default OperatorInfo;
