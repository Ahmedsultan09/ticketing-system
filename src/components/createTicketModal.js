import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import TicketDetailsModal from "./ticketDetailsModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjusted width for responsiveness
  maxWidth: 800, // Maximum width for larger screens
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="contained" color="success">
        Next
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...style, width: "80%", maxWidth: 800, height: 600 }}
          className="flex flex-col items-center justify-center rounded-2xl"
        >
          <TicketDetailsModal />
          <Box className="w-full flex flex-row gap-2 items-end justify-center">
            <Button onClick={handleClose} variant="contained" color="success">
              Confirm
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function CreateTicketModal() {
  const [open, setOpen] = React.useState(false);
  const [serialNumber, setSerialNumber] = React.useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };

  return (
    <div>
      <div className="w-full h-16 bg-white flex items-center justify-between p-4">
        <Typography className="text-orange-600">All Tickets</Typography>
        <Button variant="contained" color="success" onClick={handleOpen}>
          Create Ticket
          <AddCircleSharpIcon
            sx={{ width: 18, height: 18, marginLeft: 1 }}
          />{" "}
        </Button>
      </div>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...style, height: 200 }}
          className="flex flex-col items-center justify-between rounded-2xl"
        >
          {" "}
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
            type="Number"
            className="mt-3"
            onChange={handleSerialNumber}
          />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
