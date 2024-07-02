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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  const [tasks, setTasks] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
              Before assigning, can you please check ENG\ {engName} Tasks?
            </Typography>
            <Box className="w-full h-full flex flex-col justify-around border border-gray-700 p-2 rounded-xl">
              <Box className="w-full mt-2 border border-gray-400 p-3 rounded-b-xl">
                <Grid container spacing={1}>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">
                      <Typography
                        variant={isSmallScreen ? "body2" : "body1"}
                        noWrap
                      >
                        Client
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">
                      <Typography
                        variant={isSmallScreen ? "body2" : "body1"}
                        noWrap
                      >
                        Branch
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">
                      <Typography
                        variant={isSmallScreen ? "body2" : "body1"}
                        noWrap
                      >
                        Issue
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item className="!bg-gray-300">
                      <Typography
                        variant={isSmallScreen ? "body2" : "body1"}
                        noWrap
                      >
                        Ticket Number
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
              {tasks?.length > 0 ? (
                tasks?.map((item) => (
                  <Box
                    key={item && item.id}
                    className="w-full mb-2 border border-gray-400 p-3 rounded-b-xl"
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={3}>
                        <Item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            noWrap
                          >
                            {item && item.client}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            noWrap
                          >
                            {item && item.branch}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item>
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            noWrap
                          >
                            {item && item.issue}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={3}>
                        <Item
                          onClick={() => handleNavigate(item.id)}
                          className="w-full h-full cursor-pointer !text-blue-500"
                        >
                          <Typography
                            variant={isSmallScreen ? "body2" : "body1"}
                            noWrap
                          >
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
