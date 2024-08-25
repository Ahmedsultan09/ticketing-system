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
import InfoLabel from "../../../ui/components/infoLabel";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import axiosInstance from "../../../api/axiosInstance";
import { styled } from "@mui/material/styles";
import TasksModal from "./taskModal";
import ConfirmCloseTicketModal from "./confirmCloseTicket";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import NumbersIcon from "@mui/icons-material/Numbers";
import BusinessIcon from "@mui/icons-material/Business";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

function SpecificTicket() {
  const params = useParams();
  const [specificTicket, setSpecificTicket] = useState({});
  const [assignedEng, setAssignedEng] = useState("");
  const [engineers, setEngineers] = useState([]);
  const [modifiedEngineers, setModifiedEngineers] = useState([...engineers]);
  const [specificEngTasks, setSpecificEngTasks] = useState([]);
  const [specificEngName, setSpecificEngName] = useState("");
  const [showCloseTicketModal, setShowCloseTicketModal] = useState(false);
  const [allTickets, setAllTickets] = useState([]);

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
    async function fetchSpecificTicket() {
      try {
        const response = await axiosInstance.get("/tickets");
        const specificTicket = await response.data[params.ticketID - 1];
        setSpecificTicket(specificTicket);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSpecificTicket();
  }, [params.ticketID]);
  useEffect(() => {
    async function fetchEngineers() {
      try {
        const response = await axiosInstance.get("/engineers");
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

      setModifiedEngineers(updatedEngineers);
    }
  }, [engineers, allTickets]);

  useEffect(() => {
    const updatedEngineers = modifiedEngineers.map((engineer) => {
      const highPriorityTasks = engineer.tasks.filter(
        (task) => task.priority === "high"
      ).length;
      return {
        ...engineer,
        isBusy: highPriorityTasks > 3,
      };
    });

    // Check if there are any differences between the current and updated state
    const isDifferent = updatedEngineers.some((updatedEngineer, index) => {
      return updatedEngineer.isBusy !== modifiedEngineers[index].isBusy;
    });

    // Only update the state if there are changes
    if (isDifferent) {
      setModifiedEngineers(updatedEngineers);
    }
  }, [modifiedEngineers]);

  useEffect(() => {
    console.log(modifiedEngineers);
  }, [modifiedEngineers]);

  return (
    <main className="w-full h-full">
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
            icon={<BusinessIcon />}
            details={specificTicket?.client}
            xs={4}
          />
          <InfoLabel
            title="Operator"
            icon={<SupervisedUserCircleOutlined />}
            details={specificTicket?.operator}
            xs={4}
          />
          <InfoLabel
            title="Branch"
            icon={<LocationOnOutlinedIcon />}
            details={specificTicket?.branch}
          />
          <InfoLabel
            title="Machine brand"
            icon={<PrintOutlinedIcon />}
            details={specificTicket?.machineBrand}
          />
          <InfoLabel
            title="Machine model"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket?.machineModel}
          />
          <InfoLabel
            title="Serial Number"
            icon={<SubtitlesOutlinedIcon />}
            details={specificTicket?.serialNumber}
          />
          <InfoLabel
            title="Last visited Engnieer"
            icon={<EngineeringIcon />}
            details={specificTicket?.lastEng}
          />
          <InfoLabel
            title="Last visit date"
            icon={<CalendarMonthOutlinedIcon />}
            details={specificTicket?.lastVisitDate}
          />
          <InfoLabel
            title="Ticket Date"
            icon={<CalendarMonthOutlinedIcon />}
            details={specificTicket?.ticketDate}
          />
          {/* Edit visibaility here based on ticket type */}
          <InfoLabel
            title="Spare Part Needed"
            details={specificTicket?.sparePart}
          />
          <InfoLabel
            title="Latest meter reading"
            icon={<NumbersIcon />}
            details={specificTicket?.lastMeterReading}
          />
          <InfoLabel
            title="Latest meter date"
            icon={<CalendarMonthOutlinedIcon />}
            details={specificTicket?.lastMeterDate}
          />
          <InfoLabel
            title="Ticket Type"
            icon={<PrecisionManufacturingIcon />}
            details={specificTicket?.ticketType}
          />
          {/* Edit visibaility here based on ticket type */}
          {specificTicket?.ticketType !== "open" && (
            <InfoLabel
              title="Assigned To"
              icon={<EngineeringIcon />}
              details={specificTicket?.assignedTo}
            />
          )}
          <InfoLabel title="Issue" details={specificTicket?.issue} />
          <InfoLabel title="Suggestion" details={specificTicket?.suggestion} />
          <InfoLabel
            title="Priority"
            icon={<PriorityHighIcon />}
            details={specificTicket?.priority}
          />
          {specificTicket?.ticketType === "open" && (
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
                    className="h-20 w-full"
                  >
                    {modifiedEngineers.map((item) => {
                      return item?.isBusy ? (
                        <MenuItem
                          value={item.id}
                          disabled={item.isBusy}
                          className="!w-full flex flex-row justify-between items-center"
                        >
                          <span className="w-full">{item.name}</span>
                          <span className="w-fit px-2 h-5 text-sm bg-red-800 text-white rounded-2xl">
                            Busy
                          </span>
                          <span className="w-fit mx-2 px-2 h-5 text-sm bg-red-600 text-white rounded-2xl">
                            +3 High
                          </span>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          value={item.id}
                          key={item.id}
                          disabled={false}
                        >
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
            {specificTicket?.ticketType === "open" && (
              <Button
                onClick={handleOpen}
                variant="contained"
                color="success"
                disabled={assignedEng === "" ? true : false}
              >
                Check availability
              </Button>
            )}
            {specificTicket?.ticketType === "pending" && (
              <Button
                onClick={handleShowCloseTicketModal}
                variant="contained"
                color="success"
              >
                Close Ticket
              </Button>
            )}
            <Button
              onClick={() => navigate(-1)}
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
