import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoLabel from "../../../ui/infoLabel";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import axios from "axios";
import NumbersIcon from "@mui/icons-material/Numbers";
import BusinessIcon from "@mui/icons-material/Business";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";

function SpecificTroubleshooting() {
  const params = useParams();
  const [specificIssue, setSpecificIssue] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchTroubleshooting() {
      try {
        const response = await axios.get(
          "http://localhost:3000/troubleshooting"
        );
        const specificIssue = await response.data[params.issueID - 1];
        setSpecificIssue(specificIssue);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTroubleshooting();
  }, [params.issueID]);

  return (
    <main className="w-full h-full">
      <Box
        component="section"
        className="w-full h-16 mb-3 shadow flex items-center justify-between px-4"
      >
        <Typography variant="h6" className="text-orange-600">
          Issue Number #{params.issueID}
        </Typography>
      </Box>
      <Box component="section" className="w-full h-full mb-3">
        <Grid container spacing={2} alignItems="stretch">
          <InfoLabel
            title="Client Name"
            icon={<BusinessIcon />}
            details={specificIssue?.client}
            xs={4}
          />
          <InfoLabel
            title="Operator"
            icon={<SupervisedUserCircleOutlined />}
            details={specificIssue?.operator}
            xs={4}
          />
          <InfoLabel
            title="Branch"
            icon={<LocationOnOutlinedIcon />}
            details={specificIssue?.branch}
          />
          <InfoLabel
            title="Machine brand"
            icon={<PrintOutlinedIcon />}
            details={specificIssue?.machineBrand}
          />
          <InfoLabel
            title="Machine model"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificIssue?.machineModel}
          />
          <InfoLabel
            title="Serial Number"
            icon={<SubtitlesOutlinedIcon />}
            details={specificIssue?.serialNumber}
          />
          <InfoLabel
            title="Last visited Engnieer"
            icon={<EngineeringIcon />}
            details={specificIssue?.lastEng}
          />
          <InfoLabel
            title="Last visit date"
            icon={<CalendarMonthOutlinedIcon />}
            details={specificIssue?.lastVisitDate}
          />
          <InfoLabel
            title="Issue Date"
            icon={<CalendarMonthOutlinedIcon />}
            details={specificIssue?.issueDate}
          />
          {/* Edit visibaility here based on ticket type */}
          <InfoLabel
            title="Latest meter reading"
            icon={<NumbersIcon />}
            details={specificIssue?.lastMeterReading}
          />
          <InfoLabel
            title="Latest meter date"
            icon={<CalendarMonthOutlinedIcon />}
            details={specificIssue?.lastMeterDate}
          />
          <InfoLabel title="Issue" details={specificIssue?.issue} />
          <InfoLabel title="Suggestion" details={specificIssue?.suggestion} />
          <Box className="w-full flex flex-row gap-2 items-end justify-center my-3">
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
    </main>
  );
}

export default SpecificTroubleshooting;
