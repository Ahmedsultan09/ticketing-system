import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoLabel from "./ui/infoLabel";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import axios from "axios";
function SpecificTicket() {
  const params = useParams();
  const [specificTicket, setSpecificTicket] = useState({});

  useEffect(() => {
    async function fetchSpecificTicket() {
      try {
        const response = await axios.get("http://localhost:3000/tickets");
        setSpecificTicket(response.data[params.ticketID - 1]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSpecificTicket();
  }, [params.ticketID]);
  console.log(specificTicket);

  return (
    <main className="w-full h-full border border-red-700 ">
      <Box
        component="section"
        className="w-full h-16 shadow flex items-center justify-between px-4"
      >
        <Typography variant="h6" className="text-orange-600">
          Ticket Number #{params.ticketID}
        </Typography>
      </Box>
      <Box component="section" className="w-full h-full py-3">
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

          <InfoLabel
            title="Assigned To"
            icon={<AccountBalanceOutlinedIcon />}
            details={specificTicket.assignedTo}
          />
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
        </Grid>
      </Box>
    </main>
  );
}

export default SpecificTicket;
