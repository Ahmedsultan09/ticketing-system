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

export default function AddBranchModal({
  handleClose,
  open,
  handleChangeArea,
}) {
  const [clientID, setCurrentClientID] = useState("");
  const [governorateID, setGovernorateID] = useState("");
  const [areaID, setAreaID] = useState("");
  const [branchName, setBranchName] = useState("");
  const params = useParams();
  useEffect(() => {
    setCurrentClientID(params.clientID);
    setGovernorateID(params.govID);
    setAreaID(params.areaID);
  }, [params.clientID, params.govID, params.areaID]);

  function handleBranch(e) {
    setBranchName(e.target.value);
  }

  function handleCreateBranch() {
    axiosInstance
      .get(`/clients/${clientID}`)
      .then((res) => {
        const specificClient = res.data;
        const specificGovenorate = specificClient.governorates.find((gov) => {
          return gov.id === parseInt(governorateID);
        });
        // Check if governorate was found
        if (!specificGovenorate) {
          throw new Error("Governorate not found with ID: " + governorateID);
        }

        const updatedAreas = specificGovenorate.areas.map((area) => {
          if (area.id === parseInt(areaID)) {
            const uniqueID = Date.now();
            const newBranch = {
              id: uniqueID,
              name: branchName,
              machines: [],
            };

            // Add the new area to the governorate's areas
            return {
              ...area,
              branches: [...area.branches, newBranch],
            };
          }
          return area; // Return other governorates unchanged
        });

        // Find the governorate by governorateID
        const updatedGovernorates = specificClient.governorates.map((gov) => {
          if (gov.id === parseInt(governorateID)) {
            // Add the new area to the governorate's areas
            return {
              ...gov,
              areas: [...updatedAreas],
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
            id="Branch"
            label="Branch"
            size="small"
            onChange={handleBranch}
            fullWidth
            required
          />{" "}
          <BlackButton className="w-full mt-4" onClick={handleCreateBranch}>
            Create
          </BlackButton>
        </Box>
      </Modal>
    </div>
  );
}
