import Box from "@mui/material/Box";
import { Button, Modal, Typography } from "@mui/material";

export default function ConfirmCloseTicketModal({ ticketId, hide, open }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  // Close Ticket Modal Here
  return (
    <Modal
      open={open}
      onClose={hide}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography variant="h5" color="orange">
          Are you sure do you want to mark this ticket as closed?
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          <Button color="success" variant="contained">
            Yes, Confirm{" "}
          </Button>
          <Button color="error" variant="contained" onClick={() => hide(false)}>
            No, Back{" "}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
