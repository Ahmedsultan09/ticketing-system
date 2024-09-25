import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { Paper, styled, useMediaQuery, useTheme, Button } from "@mui/material";
import { Link as Direct } from "react-router-dom";
import SpecificTasksModal from "./specificTasksModal";

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

function AllEngineers() {
  const [engineers, setEngineers] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [specificEngDetails, setSpecificEngDetails] = useState({});
  const [updatedEngineers, setUpdatedEngineers] = useState([]);

  function handleOpen(details) {
    setOpen(true);
    setSpecificEngDetails(details);
  }

  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchEngineers() {
      const response = await axiosInstance.get("/engineers");
      const allEngineers = await response.data;
      setEngineers(allEngineers);
    }
    fetchEngineers();
  }, []);

  useEffect(() => {
    async function fetchAllTickets() {
      const response = await axiosInstance.get("/tickets");
      const allTickets = await response.data;
      setAllTickets(allTickets);
    }
    fetchAllTickets();
  }, []);

  useEffect(() => {
    if (engineers.length && allTickets.length) {
      // Create a map of tickets for quick lookup
      const ticketsMap = allTickets.reduce((map, ticket) => {
        map[ticket.id] = ticket;
        return map;
      }, {});

      // Replace task IDs with ticket objects
      const updatedEngineers = engineers.map((engineer) => ({
        ...engineer,
        tasks: engineer.tasks.map((taskId) => ticketsMap[taskId]),
      }));

      setUpdatedEngineers(updatedEngineers);
    }
  }, [engineers, allTickets]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <main className="w-full min-h-screen flex flex-row relative">
      <div className="flex flex-col w-full">
        {engineers.map((eng, index) => (
          <Item
            key={index}
            className={`!mb-4 w-full h-12 rounded-2xl flex flex-row justify-between items-center px-5 ${
              isSmallScreen ? "text-sm" : ""
            }`}
          >
            <Direct
              to={`/users/engineers/${eng.id}`}
              className={`lg:w-2/3 sm:w-1/3 flex items-center justify-start text-blue-500 font-bold ${
                isSmallScreen ? "text-xs" : ""
              }`}
            >
              {eng.name}
            </Direct>
            <div className="lg:w-1/3 sm:2/3 flex flex-row justify-end items-center gap-3">
              <span className="lg:w-1/2 flex items-center justify-end">
                <Button
                  variant="contained"
                  size="small"
                  className={`h-7 !text-[10px] lg:w-1/2 sm:w-3/4 !px-5 ${
                    isSmallScreen ? "text-xs !px-3" : ""
                  }`}
                  color="secondary"
                  onClick={() => handleOpen(eng)}
                >
                  Show Tasks ({eng.tasks.length})
                </Button>
              </span>
            </div>
          </Item>
        ))}
        <SpecificTasksModal
          open={open}
          handleClose={handleClose}
          eng={specificEngDetails}
        />
      </div>
    </main>
  );
}

export default AllEngineers;
