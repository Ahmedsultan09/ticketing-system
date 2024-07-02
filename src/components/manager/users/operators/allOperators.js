import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { Link as Direct } from "react-router-dom";
import RedLabel from "../../../../ui/type-labels/redLabel";
import GreenLabel from "../../../../ui/type-labels/greenLabel";
import YellowLabel from "../../../../ui/type-labels/yellowLabel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: 60, // fixed height
  overflow: "hidden", // ensures text overflow is handled
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

function SpecificTasksModal({ open, handleClose, operator }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleNavigate(id) {
    navigate(`/tickets/${id}`);
  }

  useEffect(() => {
    async function fetchAllTickets() {
      const response = await axios.get("http://localhost:3000/tickets");
      const allTickets = response.data;
      if (operator && operator.ticketsCreated) {
        const filteredTickets = operator.ticketsCreated.map((id) =>
          allTickets.find((ticket) => parseInt(ticket.id) === parseInt(id))
        );
        setTasks(filteredTickets);
      }
    }
    fetchAllTickets();
  }, [operator]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : "80%",
    maxWidth: 800,
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    py: 4,
    px: 1,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={modalStyle}
        className="flex flex-col items-center justify-start rounded-2xl overflow-auto"
      >
        <Box className="w-full flex flex-col gap-2 items-center justify-center">
          <Typography variant="h6" className="font-bold">
            Operator {operator.name} Tickets
          </Typography>
          <Box className="w-full h-full flex flex-col justify-around border border-gray-700 p-2 rounded-xl overflow-auto">
            <Box className="w-full mt-2 border border-gray-400 p-3 rounded-b-xl">
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Item className="!bg-gray-300">
                    <Typography variant="body2" noWrap>
                      Client
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item className="!bg-gray-300">
                    <Typography variant="body2">Branch</Typography>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item className="!bg-gray-300">
                    <Typography variant="body2" noWrap>
                      Ticket Type
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={3}>
                  <Item className="!bg-gray-300">
                    <Typography variant="body2" noWrap>
                      Ticket Number
                    </Typography>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            {tasks.length > 0 ? (
              tasks.map((item) => (
                <Box
                  key={item && item.id}
                  className="w-full mb-2 border flex border-gray-400 p-3 rounded-b-xl"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Item>
                        <Typography variant="body2" noWrap>
                          {item && item.client}
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        <Typography variant="body2" noWrap>
                          {item && item.branch}
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        <Typography
                          variant="body2"
                          noWrap
                          className="w-full flex justify-center items-center"
                        >
                          {item && item.ticketType === "closed" && (
                            <RedLabel text="closed" />
                          )}
                          {item && item.ticketType === "open" && (
                            <GreenLabel text="open" />
                          )}
                          {item && item.ticketType === "pending" && (
                            <YellowLabel text="pending" />
                          )}
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item
                        onClick={() => handleNavigate(item.id)}
                        className="w-full h-full cursor-pointer !text-blue-500"
                      >
                        <Typography variant="body2" noWrap>
                          {item && item.id}
                        </Typography>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              ))
            ) : (
              <Typography variant="body1">No tasks found.</Typography>
            )}
          </Box>
          <Box className="flex flex-row gap-2 items-center justify-center">
            <Button onClick={handleClose} variant="contained" color="error">
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

function AllOperators() {
  const [operators, setOperator] = useState([]);
  const [open, setOpen] = useState(false);
  const [specificOperatorDetails, setSpecificOperatorDetails] = useState({});

  function handleOpen(details) {
    setOpen(true);
    setSpecificOperatorDetails(details);
  }

  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchOperators() {
      const response = await axios.get("http://localhost:3000/operators");
      const allOperators = await response.data;
      setOperator(allOperators);
    }
    fetchOperators();
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <main className="w-full min-h-screen flex flex-row relative">
      <div className="flex flex-col w-full">
        {operators.map((operator, index) => (
          <Item
            key={index}
            className={`!mb-4 w-full h-12 rounded-2xl flex flex-row !justify-between items-center px-5 ${
              isSmallScreen ? "text-sm" : ""
            }`}
          >
            <Direct
              to={`/users/operators/${operator.id}`}
              className={`lg:w-2/3 sm:w-full flex items-center justify-start text-blue-500 font-bold ${
                isSmallScreen ? "text-xs" : ""
              }`}
            >
              {operator.name}
            </Direct>
            <div className="lg:w-1/2 sm:w-full flex flex-row justify-end items-center gap-3">
              <span className="lg:w-1/2 flex items-center justify-end">
                <Button
                  variant="contained"
                  size="small"
                  className={`h-7 !text-[10px] lg:w-1/2 sm:w-full  ${
                    isSmallScreen ? "text-xs" : ""
                  }`}
                  color="info"
                  onClick={() => handleOpen(operator)}
                >
                  Show Tickets ({operator.ticketsCreated.length})
                </Button>
              </span>
            </div>
          </Item>
        ))}
      </div>
      <SpecificTasksModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        operator={specificOperatorDetails}
      />
    </main>
  );
}

export default AllOperators;
