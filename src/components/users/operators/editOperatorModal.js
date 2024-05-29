import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

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
  px: 2,
  pb: 3,
};

function ChildModal({ closeMainModal, onSave, newClient }) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmSave = () => {
    onSave();
    handleClose();
    closeMainModal();
  };

  useEffect(() => {
    if (newClient === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newClient]);

  return (
    <>
      <div className="w-full flex items-center justify-center h-11 gap-3">
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          disabled={disabled}
        >
          Save
        </Button>
        <Button variant="contained" color="error" onClick={closeMainModal}>
          Cancel
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...style, width: "80%", maxWidth: 600, height: 150 }}
          className="flex flex-col items-center justify-center rounded-2xl"
        >
          <Box className="w-full flex flex-col gap-4 items-center justify-center">
            <Typography variant="h6" color="black">
              Are you sure you want to save?
            </Typography>
            <div className="flex flex-row gap-2">
              <Button
                onClick={handleConfirmSave}
                variant="contained"
                color="success"
              >
                Yes
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                No, Back
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default function EditOperatorModal({ open, handleClose, client }) {
  const [newClient, setNewClient] = useState("");

  const handleChange = (event) => {
    setNewClient(event.target.value);
  };

  const handleSave = () => {
    // Handle save logic here
    handleClose(); // Close the parent modal after saving
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "80%",
            maxWidth: 800,
            height: 180,
            borderRadius: "15px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-row w-full gap-3 items-center justify-center">
            <TextField
              disabled
              id="filled-disabled"
              label="Current"
              defaultValue={client}
              variant="filled"
              className="w-1/3"
            />
            <ArrowForwardIosIcon />
            <FormControl className="w-1/3">
              <InputLabel id="change-to">Change to</InputLabel>
              <Select
                labelId="change-to"
                id="change-to"
                value={newClient}
                label="Change to"
                onChange={handleChange}
              >
                <MenuItem value={10}>Banque Du Caire</MenuItem>
                <MenuItem value={20}>CIB</MenuItem>
                <MenuItem value={30}>NBK</MenuItem>
              </Select>
            </FormControl>
          </div>
          <ChildModal
            closeMainModal={handleClose}
            onSave={handleSave}
            newClient={newClient}
          />
        </Box>
      </Modal>
    </div>
  );
}
