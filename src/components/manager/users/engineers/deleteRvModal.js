import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteRvModal({ open, handleClose, user }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ ...style, width: "80%", maxWidth: 800, height: 150 }}
          className="flex flex-col items-center justify-between rounded-2xl"
        >
          <Typography
            variant="h6"
            className="w-full h-1/2 flex items-center justify-center"
          >
            Are u sure do you want to delete this visit?
          </Typography>
          <Box className="w-full flex flex-row gap-2 items-end justify-center">
            <Button onClick={handleClose} variant="contained" color="success">
              Yes
            </Button>
            <Button onClick={handleClose} variant="contained" color="error">
              No, Back
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
