import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddMachineRvModal from "../../components/manager/users/engineers/addMachineRvModal";
import DeleteRvModal from "../../components/manager/users/engineers/deleteRvModal";

export default function RegularVisitCard({
  client,
  branch,
  startDate,
  period,
}) {
  const [allMachines, setAllMachines] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEdit = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRemoveMachine = (machineId) => {
    setAllMachines((prev) =>
      prev.filter((machine) => machine.id !== machineId)
    );
  };

  const handleAddMachine = (machine) => {
    setAllMachines((prev) => [...prev, machine]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => setDeleteModal(true);

  useEffect(() => {
    async function getAllMachines() {
      const response = await axiosInstance.get("/machines");
      const allMachines = await response.data;
      setAllMachines(allMachines.slice(0, 7));
    }
    getAllMachines();
  }, []);

  return (
    <div className="rounded-md h-1/4 container mx-auto">
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
                {startDate} ( {period} )
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
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Machines
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Here you can find all machines that he should check
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="w-full flex flex-row flex-wrap gap-2 justify-center items-center">
            {allMachines &&
              allMachines.map((machine) => (
                <div
                  className="w-fit h-auto bg-white rounded-2xl shadow-md p-3 border border-gray-300 flex flex-col gap-2 relative"
                  key={machine.id}
                >
                  <span>
                    Serial Number:{" "}
                    {machine.serialNumber.toString().toUpperCase()}
                  </span>
                  <span>QR Code: {machine.qrCode}</span>
                  <span>Machine Brand: {machine.machineBrand}</span>
                  <span>Machine Model: {machine.machineModel}</span>
                  <span>Machine Type: {machine.machineType}</span>
                  {isEditMode && (
                    <span
                      className="absolute -top-2 -right-2 text-red-700 cursor-pointer"
                      onClick={() => handleRemoveMachine(machine.id)}
                    >
                      <RemoveCircleOutlineIcon className="border rounded-full" />
                    </span>
                  )}
                </div>
              ))}
            {isEditMode && (
              <span
                className="lg:w-1/6 w-full rounded-full flex items-center justify-center"
                onClick={handleOpen}
              >
                <AddCircleOutlineIcon className="!text-5xl text-green-700 border border-green-700 rounded-full !w-2/5 !h-2/5" />
              </span>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="w-full h-12 border border-gray-300 rounded-b-2xl flex flex-row items-center justify-end gap-2 px-2 ">
        {isEditMode ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            startIcon={<DoneOutlineIcon />}
            onClick={handleEdit}
          >
            save
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            startIcon={<EditNoteIcon />}
            onClick={handleEdit}
          >
            edit
          </Button>
        )}
        <Button
          variant="contained"
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button variant="contained" color="warning" size="small">
          Assign Engineer
        </Button>
      </div>
      <AddMachineRvModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleAddMachine={handleAddMachine}
        currentMachines={allMachines}
      />
      <DeleteRvModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />
    </div>
  );
}
