import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoLabel from "../ui/infoLabel";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import axios from "axios";
import { styled } from "@mui/material/styles";
import TasksModal from "../taskModal";
import ConfirmCloseTicketModal from "./confirmCloseTicket";

function SpecificTicket() {
  const params = useParams();
  const [specificTicket, setSpecificTicket] = useState({});
  const [assignedEng, setAssignedEng] = useState("");
  const [engineers, setEngineers] = useState([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [specificEngTasks, setSpecificEngTasks] = useState([]);
  const [specificEngName, setSpecificEngName] = useState("");
  const [showCloseTicketModal, setShowCloseTicketModal] = useState(false);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  function handleSelectingEng(e) {
    setAssignedEng(e.target.value);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: "start",
    display: "flex",
    alignItems: "center",
  }));
  const handleShowCloseTicketModal = () => {
    setShowCloseTicketModal(true);
  };
  const handleHideCloseTicketModal = () => {
    setShowCloseTicketModal(false);
  };
  useEffect(() => {
    if (isCanceled) {
      navigate("/tickets");
    }
  }, [isCanceled, navigate]);
  useEffect(() => {
    async function fetchSpecificTicket() {
      try {
        const response = await axios.get("http://localhost:3000/tickets");
        setSpecificTicket(response.data[params.ticketID - 1]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSpecificTicket();
  }, [params.ticketID]);
  useEffect(() => {
    async function fetchEngineers() {
      try {
        const response = await axios.get("http://localhost:3000/engineers");
        setEngineers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEngineers();
  }, []);

  useEffect(() => {
    async function fetchSpecificEng() {
      try {
        const engData = await engineers.find((eng) => eng.id === assignedEng);
        setSpecificEngName(engData.name);
        setSpecificEngTasks(engData.tasks);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSpecificEng();
  }, [assignedEng, engineers]);

  return (
    <main className="w-full h-full border border-red-700 ">
      <Box
        component="section"
        className="w-full h-16 mb-3 shadow flex items-center justify-between px-4"
      >
        <Typography variant="h6" className="text-orange-600">
          Ticket Number #{params.ticketID}
        </Typography>
      </Box>
      <Box component="section" className="w-full h-full mb-3">
        <Grid container spacing={2} alignItems="stretch">
          <InfoLabel
            title="Client Name"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.client}
            xs={4}
          />
          <InfoLabel
            title="Operator"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.operator}
            xs={4}
          />
          <InfoLabel
            title="Branch"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.branch}
          />
          <InfoLabel
            title="Machine brand"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.machineBrand}
          />
          <InfoLabel
            title="Machine model"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.machineModel}
          />
          <InfoLabel
            title="Serial Number"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.serialNumber}
          />
          <InfoLabel
            title="Last visited Engnieer"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.lastEng}
          />
          <InfoLabel
            title="Last visit date"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.lastVisitDate}
          />
          <InfoLabel
            title="Ticket Date"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.ticketDate}
          />
          {/* Edit visibaility here based on ticket type */}
          <InfoLabel
            title="Spare Part Needed"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.sparePart}
          />
          <InfoLabel
            title="Latest meter reading"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.lastMeterReading}
          />
          <InfoLabel
            title="Latest meter date"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.lastMeterDate}
          />
          <InfoLabel
            title="Ticket Type"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.ticketType}
          />
          {/* Edit visibaility here based on ticket type */}
          {specificTicket.ticketType !== "open" && (
            <InfoLabel
              title="Assigned To"
              icon={<AccountBalanceOutlinedIcon />}
              details={specificTicket.assignedTo}
            />
          )}
          <InfoLabel
            title="Issue"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.issue}
          />
          <InfoLabel
            title="Suggestion"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.suggestion}
          />
          {specificTicket.ticketType === "open" && (
            <Grid item xs={12}>
              <Item className="h-full">
                {" "}
                <FormControl className="w-full ">
                  <InputLabel id="issue-type" className="mt-3">
                    Assign To
                  </InputLabel>
                  <Select
                    labelId="assignTo"
                    id="assignedEng"
                    value={assignedEng}
                    label="Assign To"
                    onChange={handleSelectingEng}
                    className="h-20"
                  >
                    {engineers.map((item) => {
                      return (
                        <MenuItem value={item.id} key={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>{" "}
                </FormControl>
              </Item>
            </Grid>
          )}
          <Box className="w-full flex flex-row gap-2 items-end justify-center my-3">
            {specificTicket.ticketType === "open" && (
              <Button onClick={handleOpen} variant="contained" color="success">
                Check availability
              </Button>
            )}
            {specificTicket.ticketType === "pending" && (
              <Button
                onClick={handleShowCloseTicketModal}
                variant="contained"
                color="success"
              >
                Close Ticket
              </Button>
            )}
            <Button
              onClick={() => setIsCanceled(true)}
              variant="contained"
              color="error"
            >
              Back
            </Button>
          </Box>{" "}
        </Grid>
      </Box>
      {specificEngTasks.length > 0 && (
        <TasksModal
          open={open}
          handleClose={handleClose}
          tasksId={specificEngTasks}
          engName={specificEngName}
        />
      )}
      {showCloseTicketModal && (
        <ConfirmCloseTicketModal
          ticketId={params.ticketID}
          open={showCloseTicketModal}
          hide={handleHideCloseTicketModal}
        />
      )}
    </main>
  );
}

export default SpecificTicket;
