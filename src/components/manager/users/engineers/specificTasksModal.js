import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import {
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Box,
  Modal,
  styled,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
function SpecificTasksModal({ open, handleClose, eng }) {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleNavigate(id) {
    navigate(`/tickets/${id}`);
  }

  useEffect(() => {
    async function fetchAllTickets() {
      const response = await axiosInstance.get("/tickets");
      const allTickets = response.data;
      if (eng && eng.tasks) {
        const filteredTickets = eng.tasks.map((id) =>
          allTickets.find((ticket) => parseInt(ticket.id) === parseInt(id))
        );
        setTasks(filteredTickets);
      }
    }
    fetchAllTickets();
  }, [eng]);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : "80%",
    maxWidth: 800,
    height: "auto",
    maxHeight: "90vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    overflowY: "auto",
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
      <Box sx={modalStyle} className="flex flex-col items-center rounded-2xl">
        <Box className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <Typography variant="h6" className="font-bold">
            ENG/ {eng.name} tasks
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
                      Issue
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
                        <Typography variant="body2" noWrap>
                          {item && item.issue}
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

export default SpecificTasksModal;
