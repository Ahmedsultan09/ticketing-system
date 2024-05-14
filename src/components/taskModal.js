import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TasksModal({ open, handleClose, engName, tasksId }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [ticketDetails, setTicketDetails] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchAllTickets() {
      const response = await axios.get("http://localhost:3000/tickets");
      const allTickets = response.data;
      const filteredTickets = tasksId.map((id) =>
        allTickets.find((ticket) => parseInt(ticket.id) === parseInt(id))
      );
      setTasks(filteredTickets);
    }
    fetchAllTickets();
  }, [tasksId]);
  const navigate = useNavigate();
  function handleNavigate(id) {
    navigate(`/tickets/${id}`);
    handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ ...style, width: "80%", maxWidth: 800, height: 600 }}
          className="flex flex-col items-center justify-center rounded-2xl"
        >
          <Box className="w-full flex flex-col gap-2 items-center justify-center">
            <Typography variant="h6" className="font-bold">
              Before assigning can u please check ENG\ {engName} Tasks?
            </Typography>
            <Box className="w-full h-full flex flex-col justify-around border border-gray-700 p-2 rounded-xl">
              <Box className="w-full mt-2 border border-gray-400 p-3 rounded-b-xl">
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">Client</Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">Branch</Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">Issue</Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">Ticket Number</Item>
                  </Grid>
                </Grid>
              </Box>
              {tasks.length > 0 ? (
                tasks.map((item) => (
                  <Box
                    key={item && item.id}
                    className="w-full mb-2 border border-gray-400 p-3 rounded-b-xl"
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Item>{item && item.client}</Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item>{item && item.branch}</Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item>{item && item.issue}</Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item
                          onClick={() => handleNavigate(item.id)}
                          className="w-full h-full cursor-pointer !text-blue-500"
                        >
                          {item && item.id}
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              ) : (
                <Typography variant="body1">No tasks found.</Typography>
              )}
            </Box>
            <Box className="flex flex-row gap-2 items-center justify-centers">
              <Button onClick={handleClose} variant="contained" color="success">
                Confirm
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
