import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

export default function AddMachineRvModal({
  handleClose,
  open,
  handleAddMachine,
  currentMachines = [],
}) {
  const [serialNumber, setSerialNumber] = useState("");
  const [machine, setMachine] = useState(null);
  const [isMachineExist] = useState(false);

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };

  useEffect(() => {
    async function addMachine() {
      const response = await axiosInstance.get("/machines");
      const allMachines = await response.data;

      if (!isMachineExist) {
        const specificMachine = await allMachines.find((machine) => {
          const machineSerial = machine.serialNumber;
          return (
            machineSerial?.toString().toUpperCase() ===
            serialNumber?.toString().toUpperCase()
          );
        });
        setMachine(specificMachine);
      }
    }
    addMachine();
  }, [serialNumber, isMachineExist, currentMachines, machine]);

  const handleAdd = () => {
    const insertedSerial = serialNumber.toString().toUpperCase();
    const existingSerials = currentMachines.map((machine) => {
      const serial = machine.serialNumber?.toString().toUpperCase();
      return serial;
    });
    const isMachineExist = existingSerials.includes(insertedSerial);

    if (!isMachineExist && machine) {
      handleAddMachine(machine);
    } else {
      console.log("Machine already exists or no machine found");
    }
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flex justify-center items-center flex-col">
          <Typography
            variant="h6"
            className="text-orange-600 "
            sx={{
              fontSize: { xs: "16px", sm: "18px", lg: "24px" },
              textAlign: "center",
            }}
          >
            Please enter printer serial number or QR code
          </Typography>
          <TextField
            variant="outlined"
            label="Serial Number / QR Code"
            type="text"
            className="!mt-2"
            onChange={handleSerialNumber}
          />
          <div className="flex justify-center items-center flex-row gap-2 mt-2">
            <Button variant="contained" color="success" onClick={handleAdd}>
              add
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
