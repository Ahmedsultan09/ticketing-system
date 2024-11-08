import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteModal({
  openDeleteModal,
  handleClickClose,
  handleDelete,
  id,
  govName,
  isMachine,
  isGov,
  isBranch,
  isClient,
  isArea,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={openDeleteModal}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete this ${
            isArea
              ? "area"
              : isBranch
              ? "branch"
              : isClient
              ? "client"
              : isMachine
              ? "machine"
              : isGov
              ? "governorate"
              : null
          }?
          `}
        </DialogTitle>
        <DialogContent>
          {govName && (
            <DialogContentText id="alert-dialog-description">
              By deleting this client you are going to delete
              (Governorates/Areas/Branches) it has inside, make sure you are
              confident of doing so.
            </DialogContentText>
          )}
          {isMachine && <DialogContentText>{id}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClickClose}>
            Disagree
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleDelete(id);
              handleClickClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
