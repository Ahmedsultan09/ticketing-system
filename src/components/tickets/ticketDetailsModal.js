import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MachineParts from "../machineParts";
import { useEffect, useState } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TicketDetailsModal({ serialNumber }) {
  const [issueType, setIssueType] = useState("");
  const [ticketBySerial, setTicketBySerial] = useState([]);
  const handleIssueType = (e) => {
    setIssueType(e.target.value);
  };
  useEffect(() => {
    async function fetchTicketBySerial() {
      const response = await axios.get("http://localhost:3000/tickets");
      const allTickets = await response.data;
      const filteredTickets = allTickets.find(
        (ticket) => parseInt(ticket.serialNumber) === parseInt(serialNumber)
      );
      setTicketBySerial(filteredTickets);
    }
    fetchTicketBySerial();
  }, [serialNumber]);

  console.log(ticketBySerial);
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>Client name: {ticketBySerial && ticketBySerial.client}</Item>
        </Grid>
        <Grid xs={8}>
          <Item>
            Serial Number: {ticketBySerial && ticketBySerial.serialNumber}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            Machine Brand: {ticketBySerial && ticketBySerial.machineBrand}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>Machine Model: Xerox</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Machine Type: MFP</Item>
        </Grid>
        <Grid xs={4}>
          <Item>QR Code: 152</Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            Last visit date: {ticketBySerial && ticketBySerial.lastVisitDate}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            Last Visit ENG: {ticketBySerial && ticketBySerial.lastEng}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            Meter Reading: {ticketBySerial && ticketBySerial.lastMeterReading}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>Branch: {ticketBySerial && ticketBySerial.branch}</Item>
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ marginY: 2 }}>
        Kindly provide a concise overview of the issue:
      </Typography>
      <TextField fullWidth label="Issue" id="issueDetails" />
      <Typography variant="h6" sx={{ marginY: 2 }}>
        A Suggestion to solve the issue:
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="issue-type">Type</InputLabel>
          <Select
            labelId="issue-type"
            id="issueType"
            value={issueType}
            label="Issue Type"
            onChange={handleIssueType}
          >
            <MenuItem value={"spare-parts"}>Spare Parts</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {issueType === "spare-parts" && <MachineParts />}
      <TextField fullWidth label="Suggestion" id="issueSuggestion" />
    </Box>
  );
}
