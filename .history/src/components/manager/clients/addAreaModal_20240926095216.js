import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button as BlackButton } from "src/ui/components/button";

import axiosInstance from "../../../api/axiosInstance";
import { useParams } from "react-router-dom";

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

export default function AddAreaModal({ handleClose, open }) {
  const [clientID, setCurrentClientID] = useState("");
  const [areaName, setAreaName] = useState("");
  const params = useParams();
  useEffect(() => {
    setCurrentClientID(params.clientID);
    console.log(clientID);
  }, [params.clientID, clientID]);

  function handleAreaName(e) {
    setAreaName(e.target.value);
  }

  function handleCreateArea() {
    axiosInstance
      .post(`/client/${clientID}/areas`, {
        area: areaName,
      })
      .then((res) => console.log(res.data));
    handleClose();
  }

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
            minHeight: 350,
            maxHeight: "80vh",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            overflow: "auto",
          }}
          className="scrollbar-hide"
        >
          <TextField
            id="Area"
            label="Area"
            size="small"
            onChange={handleAreaName}
            fullWidth
            required
          />{" "}
          <BlackButton className="w-full mt-4" onClick={handleCreateArea}>
            Create
          </BlackButton>
        </Box>
      </Modal>
    </div>
  );
}
