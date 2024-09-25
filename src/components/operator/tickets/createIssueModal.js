import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import TicketDetailsModal from "./ticketDetailsModal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: "auto", // Allows scrolling
};

function ChildModal({ serialNumber }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="success"
        className="!mt-2"
      >
        Next
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            height: "auto",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          className="flex flex-col items-center justify-center rounded-2xl"
        >
          <TicketDetailsModal serialNumber={serialNumber} />
          <Box className="w-full flex flex-row gap-2 mt-2 justify-center">
            <Button onClick={handleClose} variant="contained" color="success">
              Confirm
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default function CreateIssueModal({
  type,
  troubleshooting,
  btnOnly = undefined,
}) {
  const [open, setOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
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
      <div
        className={`w-full h-16 flex ${
          btnOnly ? "" : "bg-white"
        } items-center justify-between p-4`}
      >
        {/* Display ticket type labels only if not btnOnly */}
        {!btnOnly && (
          <>
            {type === "opened" && (
              <Typography className="text-orange-600 !font-bold">
                Opened Tickets
              </Typography>
            )}
            {type === "closed" && (
              <Typography className="text-orange-600 !font-bold">
                Closed Tickets
              </Typography>
            )}
            {type === "pending" && (
              <Typography className="text-orange-600 !font-bold">
                Pending Tickets
              </Typography>
            )}
            {type === undefined && !troubleshooting && (
              <Typography className="text-orange-600 !font-bold">
                All Tickets
              </Typography>
            )}
            {type === undefined && troubleshooting && (
              <Typography className="text-orange-600 !font-bold">
                All Troubleshooting
              </Typography>
            )}
          </>
        )}

        {/* Conditionally render the button based on btnOnly */}
        {btnOnly ? (
          <Button variant="contained" color="success" onClick={handleOpen}>
            Submit an issue
            <AddCircleSharpIcon sx={{ width: 18, height: 18, marginLeft: 1 }} />
          </Button>
        ) : null}
      </div>{" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            height: "auto", // Adjust height to fit content
            maxHeight: "90vh", // Ensure the modal doesn't exceed the viewport height
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
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
            type="text"
            className="!mt-2"
            onChange={handleSerialNumber}
          />
          <ChildModal serialNumber={serialNumber.toString().toUpperCase()} />
        </Box>
      </Modal>
    </div>
  );
}
