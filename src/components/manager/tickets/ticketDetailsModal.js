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
import MachinePartsOptions from "../machines/machinePartsOptions";
import { useEffect, useState } from "react";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { TimeField } from "@mui/x-date-pickers";
import ContractRules from "../../../ui/contractRules";

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
  const [area, setArea] = useState("");
  const [branch, setBranch] = useState("");
  const [dateValue, setDateValue] = useState(dayjs(new Date()));
  const [timeValue, setTimeValue] = useState(null);
  const [solved, setSolved] = useState(true);

  const handleIssueType = (e) => {
    setIssueType(e.target.value);
  };
  const handleSolved = (e) => {
    setSolved(e.target.value);
  };
  const handleBranch = (e) => {
    setBranch(e.target.value);
  };
  const handleArea = (e) => {
    setArea(e.target.value);
  };

  //fetch machines here not tickets
  useEffect(() => {
    async function fetchTicketBySerial() {
      const response = await axios.get("http://localhost:3000/tickets");
      const allTickets = await response.data;
      const filteredTickets = allTickets.find(
        (ticket) =>
          ticket.serialNumber.toString().toUpperCase() === serialNumber
      );
      setTicketBySerial(filteredTickets);
    }
    fetchTicketBySerial();
  }, [serialNumber]);
  const rules = [
    { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
  ];
  console.log(timeValue);
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          {" "}
          <ContractRules rules={rules} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Item>Client: {ticketBySerial && ticketBySerial.client}</Item>
        </Grid>
        <Grid xs={6}>
          <Item>S/N: {ticketBySerial && ticketBySerial.serialNumber}</Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            Machine Brand: {ticketBySerial && ticketBySerial.machineBrand}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            Machine Model: {ticketBySerial && ticketBySerial.machineModel}
          </Item>
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
        <Grid xs={12}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <FormControl fullWidth>
              <div className="w-full flex justify-end !my-2">
                {" "}
                <Typography className="bg-red-700 text-white rounded-2xl px-2">
                  : تفاصيل وبيانات البلاغ{" "}
                </Typography>
              </div>
              <TextField id="end-user-name" label="End user name" type="text" />
              <TextField
                type="number"
                id="end-user-number"
                label="End user number"
                className="!mt-1"
              />
              <TextField
                type="text"
                id="ticket-number"
                label="Ticket Number"
                className="!mt-1"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "TimePicker"]}
                  sx={{ width: "100%" }}
                >
                  <DatePicker
                    label="Ticket Date"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    sx={{ width: "100%", pt: 0 }}
                  />
                  <TimeField onChange={(newValue) => setTimeValue(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="branch">Area</InputLabel>
              <Select
                labelId="area"
                id="area"
                value={area}
                label="Area"
                onChange={handleArea}
                required
              >
                <MenuItem value={"القاهرة"}>القاهرة</MenuItem>
                <MenuItem value={"الاسكندرية"}>الاسكندرية</MenuItem>
                <MenuItem value={"السويس"}>السويس</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="branch">Branch</InputLabel>
              <Select
                labelId="branch"
                id="branch"
                value={branch}
                label="Branch"
                onChange={handleBranch}
                required
              >
                <MenuItem value={312}>الميثاق - 312</MenuItem>
                <MenuItem value={120}>وسط البلد - 120</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <div className="w-full flex justify-end !my-2">
        {" "}
        <Typography className=" bg-red-700 text-white rounded-2xl px-2">
          : محتوى البلاغ طبقا لشكوى العميل كما هي{" "}
        </Typography>
      </div>
      <TextField fullWidth label="Issue" id="issueDetails" />
      <div className="w-full flex flex-col items-end !my-1">
        {" "}
        <Typography className=" bg-red-700 text-white rounded-2xl px-2">
          هل تم حل المشكلة؟{" "}
        </Typography>
        <FormControl fullWidth className="!my-2">
          <InputLabel id="issue-type">اختر الاجابة</InputLabel>

          <Select
            labelId="solved"
            id="solved"
            value={solved}
            label="اختر الاجابة"
            onChange={handleSolved}
          >
            <MenuItem value={true}>نعم</MenuItem>
            <MenuItem value={false}>لا</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!solved ? (
        <div>
          {" "}
          <div className="w-full flex justify-end !my-2">
            {" "}
            <Typography className=" bg-red-700 text-white rounded-2xl px-2">
              : التشخيص المبدئى للعطل{" "}
            </Typography>
          </div>
          <Box
            sx={{
              minWidth: 120,
            }}
          >
            <FormControl fullWidth className="!mb-1">
              <InputLabel id="issue-type">Issue Type</InputLabel>
              <Select
                labelId="issue-type"
                id="issueType"
                value={issueType}
                label="Issue Type"
                onChange={handleIssueType}
              >
                <MenuItem value={"spare-parts"}>Spare Parts</MenuItem>
                <MenuItem value={"other"}>Misuse</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {issueType === "spare-parts" && <MachinePartsOptions />}
          <TextField fullWidth label="Suggestion" id="issueSuggestion" />
        </div>
      ) : (
        <div className="w-full flex flex-col items-end !my-1">
          {" "}
          <Typography className=" bg-red-700 text-white rounded-2xl px-2">
            :شرح مبسط كيف قمت بحل المشكلة{" "}
          </Typography>
          <TextField
            fullWidth
            label="Explanation"
            id="explanation"
            className="!mt-2"
          />
        </div>
      )}
    </Box>
  );
}
