import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "src/api/axiosInstance";
import SearchIcon from "@mui/icons-material/Search";
import useFetchMachines from "src/hooks/useFetchMachines";
import MachineCard from "src/ui/cards/machineCard";

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

function ChildModal({
  closeMainModal,
  handleAddMachine,
  clearMatchedMachines,
  matchedMachine,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    clearMatchedMachines();
  };

  return (
    <>
      <div className="w-full flex items-center justify-center h-11 mt-2 gap-3">
        {" "}
        <Button
          variant="contained"
          color="success"
          onClick={handleAddMachine}
          disabled={!Object.keys(matchedMachine).length > 0}
        >
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

  const [newClient, setNewClient] = useState({});
  const [isExistingMachine, setExistingMachine] = useState(true);
  const [serialNumber, setSerialNumber] = useState("");
  const [matchedMachine, setMatchedMachine] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const [machineNotFound, setMachineNotFound] = useState(false);
  const allMachines = useFetchMachines();

  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };

  const handleRadio = (e) => {
    setOwnership(e.target.value);
  };

  const clearMatchedMachines = () => {
    setMatchedMachine({});
  };

  const handleExistingMachine = (e) => {
    if (e.target.value === "true") {
      setExistingMachine(true);
    } else {
      setExistingMachine(false);
    }
  };
  const handleSearch = () => {
    const matchedMachine = allMachines.find((machine) => {
      return (
        machine.serialNumber.toString().toUpperCase() ===
        serialNumber.toString().toUpperCase()
      );
    });

    setMatchedMachine(matchedMachine);
  };

  useEffect(() => {
    if (serialNumber === "") {
      setMatchedMachine({});
    }
  }, [serialNumber]);

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
        const specificGovenorate = specificClient.governorates.find(
          (gov) => gov.id === parseInt(govID)
        );

        if (!specificGovenorate) {
          throw new Error("Governorate not found with ID: " + govID);
        }

        const specificArea = specificGovenorate.areas.find(
          (area) => area.id === parseInt(areaID)
        );

        if (!specificArea) {
          throw new Error("Area not found with ID: " + areaID);
        }

        const updatedBranches = specificArea.branches.map((branch) => {
          if (branch.id === parseInt(branchID)) {
            // Update the machines in the existing branch
            return { ...branch, machines: [...branch.machines, machineData] };
          }
          return branch;
        });

        // Update the area with the modified branches array
        const updatedAreas = specificGovenorate.areas.map((area) => {
          if (area.id === parseInt(areaID)) {
            return { ...area, branches: updatedBranches };
          }
          return area;
        });

        // Update the governorate with the modified areas array
        const updatedGovernorates = specificClient.governorates.map((gov) => {
          if (gov.id === parseInt(govID)) {
            return { ...gov, areas: updatedAreas };
          }
          return gov;
        });

        return axiosInstance.put(`/clients/${currentClient.id}`, {
          ...specificClient,
          governorates: updatedGovernorates,
        });
      })
      .then((res) => {
        console.log("Updated client with new machine:", res.data);
        setNewClient(res.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating machine:", error);
      });
  }
  useEffect(() => {
    console.log(Object.keys(matchedMachine).length > 0);
  }, [matchedMachine]);
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
          <div
            className="w-full px-4 py-2 flex lg:flex-row flex-col justify-between  items-center border border-gray-400 rounded-xl"
            dir="rtl"
          >
            <Typography>هل الماكينة موجودة بالفعل ؟</Typography>
            <RadioGroup
              value={isExistingMachine}
              onChange={handleExistingMachine}
              sx={{
                display: "flex",
                width: "auto",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                paddingLeft: "4px",
                justifyItems: "center",
              }}
            >
              {" "}
              <FormControlLabel value={true} control={<Radio />} label="نعم" />
              <FormControlLabel value={false} control={<Radio />} label="لا" />
            </RadioGroup>
          </div>

          {isExistingMachine && (
            <div className="w-full">
              <Typography
                variant="h6"
                className="text-orange-600 "
                sx={{
                  fontSize: { xs: "16px", sm: "18px", lg: "24px" },
                  textAlign: "center",
                }}
                dir="rtl"
              >
                ادخل الـ Serial Number الخاص بالماكينة
              </Typography>
              <div className="w-full flex items-center gap-2 justify-between">
                {" "}
                <TextField
                  variant="outlined"
                  label="Serial Number / QR Code"
                  type="text"
                  className="w-full"
                  onChange={handleSerialNumber}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="info"
                  endIcon={<SearchIcon />}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              <div className="w-full flex justify-center items-center">
                {serialNumber !== "" &&
                  Object.keys(matchedMachine).length > 0 && (
                    <MachineCard
                      serialNumber={matchedMachine.serialNumber}
                      brand={matchedMachine.machineBrand}
                      machineType={matchedMachine.machineType}
                      meterReading={matchedMachine.meterReading}
                      property={matchedMachine.ownership}
                      model={matchedMachine.machineModel}
                    />
                  )}
              </div>
            </div>
          )}
          {!isExistingMachine && (
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
          )}

          <ChildModal
            closeMainModal={handleClose}
            handleAddMachine={handleAddMachine}
            clearMatchedMachines={clearMatchedMachines}
            matchedMachine={matchedMachine}
          />
        </Box>
      </Modal>
    </div>
  );
}
