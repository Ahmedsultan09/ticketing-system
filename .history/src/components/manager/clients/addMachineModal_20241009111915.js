import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import axiosInstance from "src/api/axiosInstance";

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
      <div className="w-full flex items-center justify-center h-11 mt-2 gap-3">
        {" "}
        <Button variant="contained" color="success" onClick={handleOpen}>
          Add Machine
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

export default function AddMachineModal({
  open,
  handleClose,
  currentClient,
  govID,
  areaID,
  branchID,
}) {
  const [ownership, setOwnership] = useState("non-ownership");
  const [machineData, setMachineData] = useState({
    serialNumber: "",
    meterReading: null,
    qrCode: null,
    machineModel: "",
    machineBrand: "",
    machineType: "",
    ownership: "non-ownership",
  });

  const [machines, setMachines] = useState([]);

  const handleRadio = (e) => {
    setOwnership(e.target.value);
  };

  const controlProps = (item) => ({
    checked: ownership === item,
    onChange: handleRadio,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  function handleAddMachine() {
    axiosInstance
      .get(`/clients/${currentClient.id}`)
      .then((res) => {
        const specificClient = res.data;
        const specificGovenorate = specificClient.governorates.find((gov) => {
          return gov.id === parseInt(govID);
        });
        // Check if governorate was found
        if (!specificGovenorate) {
          throw new Error("Governorate not found with ID: " + govID);
        }

        const specificArea = specificGovenorate.areas.find((area) => {
          return area.id === parseInt(areaID);
        });

        if (!specificArea) {
          throw new Error("Governorate not found with ID: " + areaID);
        }

        const updatedBranch = specificArea.branches.map((branch) => {
          if (branch.id === parseInt(branchID)) {
            return { ...branch, machines: [...machines, machineData] };
          } else {
            return branch;
          }
        });
        // Find the governorate by governorateID
        const updatedAreas = specificArea.map((area) => {
          if (area.id === parseInt(areaID)) {
            // Add the new area to the governorate's areas
            return {
              ...area,
              branches: [...area.branches, updatedBranch],
            };
          }
          return area; // Return other governorates unchanged
        });
        const updatedGovernorates = specificClient.governorates.map((gov) => {
          if (gov.id === parseInt(govID)) {
            // Add the new area to the governorate's areas
            return {
              ...gov,
              areas: [...updatedAreas],
            };
          }
          return gov; // Return other governorates unchanged
        });

        return axiosInstance.put(`/clients/${currentClient.id}`, {
          ...specificClient,
          governorates: updatedGovernorates,
        });
      })
      .then((res) => {
        console.log("Updated client with new area:", res.data);
        handleChangeClient(res.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating area:", error);
      });
  }

  useEffect(() => {
    console.log(currentClient);
  }, [currentClient]);
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
            height: 600,
            borderRadius: "15px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-row flex-wrap gap-3 items-start justify-between">
            <TextField
              id="serial-number"
              label="Serial Number"
              size="small"
              type="text"
              onChange={(e) => {
                setMachineData({
                  ...machineData,
                  serialNumber: e.target.value,
                });
              }}
              required
              className="w-[49%]"
            />
            <TextField
              id="meter-reading"
              label="Meter Reading"
              size="small"
              type="number"
              required
              className="w-[49%]"
              onChange={(e) => {
                setMachineData({
                  ...machineData,
                  meterReading: parseInt(e.target.value),
                });
              }}
            />
            <TextField
              id="qr-code"
              label="QR Code"
              size="small"
              type="number"
              className="w-[49%]"
              onChange={(e) => {
                setMachineData({
                  ...machineData,
                  qrCode: parseInt(e.target.value),
                });
              }}
            />

            <TextField
              id="model"
              label="Model"
              size="small"
              type="text"
              className="w-[49%]"
              required
              onChange={(e) => {
                setMachineData({
                  ...machineData,
                  machineModel: e.target.value,
                });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="branch">Brand</InputLabel>
              <Select
                labelId="brand"
                id="brand"
                value={machineData.machineBrand}
                label="Brand"
                onChange={(e) => {
                  setMachineData({
                    ...machineData,
                    machineBrand: e.target.value,
                  });
                }}
                required
              >
                <MenuItem value="Xerox">Xerox</MenuItem>
                <MenuItem value="HP">HP</MenuItem>
                <MenuItem value="Samsung">Samsung</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="branch"
                id="branch"
                value={machineData.machineType}
                label="Type"
                onChange={(e) => {
                  setMachineData({
                    ...machineData,
                    machineType: e.target.value,
                  });
                }}
                required
              >
                <MenuItem value="Scanner">Scanner</MenuItem>
                <MenuItem value="Printer">Printer</MenuItem>
                <MenuItem value="MFP">MFP</MenuItem>
              </Select>
            </FormControl>
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <span>
                {" "}
                <span>Big Data's</span>
                <Radio
                  {...controlProps("property")}
                  color="success"
                  onClick={(e) => {
                    setMachineData({
                      ...machineData,
                      property: e.target.value,
                    });
                  }}
                />
              </span>
              <span>
                {" "}
                <span>non-ownership</span>
                <Radio
                  {...controlProps("non-ownership")}
                  color="error"
                  onClick={(e) => {
                    setMachineData({
                      ...machineData,
                      property: e.target.value,
                    });
                  }}
                />
              </span>{" "}
            </div>
          </div>
          <ChildModal closeMainModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}