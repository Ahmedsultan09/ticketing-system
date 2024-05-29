import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
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

function ChildModal({ closeMainModal, onSave, isSaveDisabled }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmSave = () => {
    onSave(); // Call the save function
    handleClose(); // Close the child modal
    closeMainModal(); // Close the parent modal
  };

  return (
    <>
      <div className="w-full flex items-center justify-center h-11 gap-3">
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          disabled={isSaveDisabled}
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

export default function EditUserModal({ open, handleClose, user }) {
  const [radioValue, setRadioValue] = useState("");
  const [nameValue, setName] = useState("");
  const [emailValue, setEmail] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (user) {
      setRadioValue(user.role || "");
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    const validateForm = () => {
      if (nameValue && emailValue && radioValue) {
        setIsSaveDisabled(false);
      } else {
        setIsSaveDisabled(true);
      }
    };
    validateForm();
  }, [radioValue, nameValue, emailValue]);

  const handleRadio = (e) => {
    setRadioValue(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
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
            height: 380,
            borderRadius: "15px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-row flex-wrap gap-3 items-start justify-between">
            <TextField
              id="full-name"
              label="Full name"
              size="small"
              fullWidth
              value={nameValue}
              onChange={handleName}
              required
            />
            <TextField
              id="email"
              label="E-mail address"
              size="small"
              value={emailValue}
              onChange={handleEmail}
              fullWidth
              required
            />

            <FormLabel
              id="demo-row-radio-buttons-group-label"
              className="w-full flex justify-center items-center"
            >
              Select Role
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radioValue}
              onChange={handleRadio}
              className="w-full flex justify-center"
            >
              <FormControlLabel
                value="engineer"
                control={<Radio />}
                label="Engineer"
              />
              <FormControlLabel
                value="manager"
                control={<Radio />}
                label="Manager"
              />
              <FormControlLabel
                value="operator"
                control={<Radio />}
                label="Operator"
              />
            </RadioGroup>
          </div>
          <ChildModal
            closeMainModal={handleClose}
            onSave={handleSave}
            isSaveDisabled={isSaveDisabled}
          />
        </Box>
      </Modal>
    </div>
  );
}
