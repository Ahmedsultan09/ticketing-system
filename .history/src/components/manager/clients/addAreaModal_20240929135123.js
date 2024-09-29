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

export default function AddAreaModal({ handleClose, open, handleChangeArea }) {
  const [clientID, setCurrentClientID] = useState("");
  const [governorateID, setGovernorateID] = useState("");
  const [area, setArea] = useState("");
  const params = useParams();
  useEffect(() => {
    setCurrentClientID(params.clientID);
    setGovernorateID(params.govID);
  }, [params.clientID, params.govID]);

  function handleArea(e) {
    setArea(e.target.value);
  }

  function handleCreateArea() {
    axiosInstance
      .get(`/clients/${clientID}`)
      .then((res) => {
        const specificClient = res.data;

        // Find the governorate by governorateID
        const updatedGovernorates = specificClient.governorates.map((gov) => {
          if (gov.id === parseInt(governorateID)) {
            const uniqueID = Date.now();
            const newArea = {
              id: uniqueID,
              name: area,
              branches: [],
            };

            // Add the new area to the governorate's areas
            return {
              ...gov,
              areas: [...gov.areas, newArea],
            };
          }
          return gov; // Return other governorates unchanged
        });

        return axiosInstance.put(`/clients/${clientID}`, {
          ...specificClient,
          governorates: updatedGovernorates,
        });
      })
      .then((res) => {
        console.log("Updated client with new area:", res.data);
        handleChangeArea(res.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating area:", error);
      });
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
            onChange={handleArea}
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
