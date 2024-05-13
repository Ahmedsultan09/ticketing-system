import * as React from "react";
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
import MachineParts from "./machineParts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TicketDetailsModal() {
  const [issueType, setIssueType] = React.useState("");
  const handleIssueType = (e) => {
    setIssueType(e.target.value);
  };
  console.log(issueType);
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>Client name: البنك الاهلى القطري الوطني</Item>
        </Grid>
        <Grid xs={8}>
          <Item>Serial Number: 56813215</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Machine Brand: Xerox</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Machine Model: B405</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Machine Type: Printer</Item>
        </Grid>
        <Grid xs={4}>
          <Item>QR Code: 152</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Last visit date: 25/4/2024</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Last Visit ENG: محمد رجب</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Meter Reading: 15250</Item>
        </Grid>
        <Grid xs={4}>
          <Item>Branch: وسط البلد</Item>
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
