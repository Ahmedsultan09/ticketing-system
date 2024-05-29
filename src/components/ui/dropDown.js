import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function DropDown({ client, branch, startDate, period }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [allMachines, setAllMachines] = useState([]);
  const [stableMachines, setStableMachines] = useState([]);
  const [unStableMachines, setUnStableMachines] = useState([]);
  useEffect(() => {
    async function getAllMachines() {
      const response = await axios.get("http://localhost:3000/tickets");
      const machineData = await response.data;
      const allMachines = machineData.map((machine, index) => {
        return {
          id: index,
          serialNumber: machine.serialNumber,
          brand: machine.machineBrand,
          model: machine.machineModel,
        };
      });

      setAllMachines(allMachines.slice(0, 7));
      setStableMachines(allMachines.slice(7, 12));
      setUnStableMachines(allMachines.slice(12, 15));
    }
    getAllMachines();
  }, []);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            backgroundColor: "lightgrey",
            mt: "10px",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Client</Typography>
          {client && branch && (
            <Typography sx={{ color: "text.secondary" }}>
              {client} ({branch})
            </Typography>
          )}
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel0bh-header"
          sx={{
            backgroundColor: "lightgrey",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Period details
          </Typography>
          {startDate && period && (
            <Typography sx={{ color: "text.secondary" }}>
              {startDate} ({period})
            </Typography>
          )}
        </AccordionSummary>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Machines</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Here you can find all machines that he should check{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="w-full flex flex-row flex-wrap gap-2 justify-center items-center">
          {allMachines.map((machine) => {
            return (
              <div
                className="w-fit h-auto bg-white rounded-2xl shadow-md p-3 border border-gray-300 flex flex-col gap-2"
                key={machine.id}
              >
                <span>Serial Number: {machine.serialNumber}</span>{" "}
                <span>QR Code: 152</span>{" "}
                <span>Machine Brand: {machine.brand}</span>{" "}
                <span>Machine Model: {machine.model}</span>{" "}
                <span>Machine Type: MFP</span>{" "}
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Stable machines
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Here you can find all machines that he checked and marked as no
            issue found{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="w-full flex flex-row flex-wrap gap-2 justify-center items-center">
          {stableMachines.map((machine) => {
            return (
              <div
                className="w-fit h-auto bg-white rounded-2xl shadow-md p-3 border border-gray-300 flex flex-col gap-2 relative"
                key={machine.id}
              >
                <span className="absolute -top-2 -right-2 text-green-600">
                  <CheckCircleIcon />
                </span>
                <span>Serial Number: {machine.serialNumber}</span>{" "}
                <span>QR Code: 152</span>{" "}
                <span>Machine Brand: {machine.brand}</span>{" "}
                <span>Machine Model: {machine.model}</span>{" "}
                <span>Machine Type: MFP</span>{" "}
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Unstable Machines{" "}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Here you can find all machines that he checked and found a problem
            with it{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="w-full flex flex-row flex-wrap gap-2 justify-center items-center">
          {unStableMachines.map((machine) => {
            return (
              <div
                className="w-fit h-auto bg-white rounded-2xl shadow-md p-3 border border-gray-300 flex flex-col gap-2 relative"
                key={machine.id}
              >
                <span className="absolute -top-2 -right-2 text-red-600">
                  <CancelIcon />
                </span>
                <span>Serial Number: {machine.serialNumber}</span>{" "}
                <span>QR Code: 152</span>{" "}
                <span>Machine Brand: {machine.brand}</span>{" "}
                <span>Machine Model: {machine.model}</span>{" "}
                <span>Machine Type: MFP</span>{" "}
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
