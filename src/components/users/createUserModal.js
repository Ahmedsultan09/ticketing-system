import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
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

function ChildModal({ closeMainModal }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center h-11 gap-3">
        {" "}
        <Button variant="contained" color="success" onClick={handleOpen}>
          Create user
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
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </>
  );
}

export default function CreateUserModal({ open, handleOpen, handleClose }) {
  const [radioValue, setRadioValue] = useState("operator");
  const [pwValue, setPwValue] = useState("");
  const [pwConfirmValue, setPwConfirmValue] = useState("");
  const [pwMatch, setPwMatch] = useState(true);
  function handleRadio(e) {
    setRadioValue(e.target.value);
  }

  useEffect(() => {
    if (pwValue === pwConfirmValue) {
      setPwMatch(true);
    } else {
      setPwMatch(false);
    }
  }, [pwValue, pwConfirmValue]);
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
              required
            />
            <TextField
              id="email"
              label="E-mail address"
              size="small"
              fullWidth
              required
            />
            <div className="w-full flex flex-row gap-3">
              <TextField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                size="small"
                className="w-[49%] "
                value={pwValue}
                onChange={(e) => {
                  setPwValue(e.target.value);
                }}
                required
              />
              {pwMatch ? (
                <TextField
                  id="confirm-password"
                  label="Confirm password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  className="w-[49%]"
                  value={pwConfirmValue}
                  onChange={(e) => {
                    setPwConfirmValue(e.target.value);
                  }}
                  required
                />
              ) : (
                <TextField
                  id="confirm-password"
                  label="Confirm password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  error
                  className="w-[49%]"
                  value={pwConfirmValue}
                  onChange={(e) => {
                    setPwConfirmValue(e.target.value);
                  }}
                  required
                />
              )}
            </div>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radioValue}
              onChange={handleRadio}
              className="w-full flex justify-center"
            >
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                className="w-full flex justify-center items-center"
              >
                Select Role
              </FormLabel>
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
          <ChildModal closeMainModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
