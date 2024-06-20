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

export default function AddMachineModal({ open, handleClose }) {
  const [brand, setBrand] = useState("");
  const [branch, setBranch] = useState("");
  const [client, setClient] = useState("");
  const [ownership, setOwnership] = useState("non-ownership");
  const [machineType, setMachineType] = useState("");
  const [area, setArea] = useState("");

  const handleRadio = (e) => {
    setOwnership(e.target.value);
  };
  function handleBrand(e) {
    setBrand(e.target.value);
  }
  function handleArea(e) {
    setArea(e.target.value);
  }
  function handleClient(e) {
    setClient(e.target.value);
  }
  const handleBranch = (e) => {
    setBranch(e.target.value);
  };

  const handleType = (e) => {
    setMachineType(e.target.value);
  };
  const controlProps = (item) => ({
    checked: ownership === item,
    onChange: handleRadio,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

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
            />
            <TextField
              id="qr-code"
              label="QR Code"
              size="small"
              type="number"
              required
              className="w-[49%]"
            />

            <TextField
              id="model"
              label="Model"
              size="small"
              type="text"
              className="w-[49%]"
              required
            />
            <FormControl fullWidth>
              <InputLabel id="branch">Brand</InputLabel>
              <Select
                labelId="brand"
                id="brand"
                value={brand}
                label="Brand"
                onChange={handleBrand}
                required
              >
                <MenuItem value="xerox">Xerox</MenuItem>
                <MenuItem value="hp">HP</MenuItem>
                <MenuItem value="samsung">Samsung</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="branch">Client</InputLabel>
              <Select
                labelId="client"
                id="client"
                value={client}
                label="Client"
                onChange={handleClient}
                required
              >
                <MenuItem value="qnb">QNB</MenuItem>
                <MenuItem value="cib">CIB</MenuItem>
                <MenuItem value="nbk">NBK</MenuItem>
                <MenuItem value="fab">FAB</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="area">Area</InputLabel>
              <Select
                labelId="Area"
                id="area"
                value={area}
                label="Area"
                onChange={handleArea}
                required
              >
                <MenuItem value={1}>القاهرة</MenuItem>
                <MenuItem value={2}>الاسكندرية</MenuItem>
                <MenuItem value={3}>السويس</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="branch">Branch</InputLabel>
              <Select
                labelId="branch"
                id="branch"
                value={branch}
                label="Branch"
                onChange={handleBranch}
                required
              >
                <MenuItem value={312}>الميثاق - 312</MenuItem>
                <MenuItem value={150}>هليوبوليس - 150</MenuItem>
                <MenuItem value={120}>وسط البلد - 120</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="branch"
                id="branch"
                value={machineType}
                label="Type"
                onChange={handleType}
                required
              >
                <MenuItem value={1}>Scanner</MenuItem>
                <MenuItem value={2}>Printer</MenuItem>
                <MenuItem value={3}>MFP</MenuItem>
              </Select>
            </FormControl>
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <span>
                {" "}
                <span>Property</span>
                <Radio {...controlProps("property")} color="success" />
              </span>
              <span>
                {" "}
                <span>non-ownership</span>
                <Radio {...controlProps("non-ownership")} color="error" />
              </span>{" "}
            </div>
          </div>
          <ChildModal closeMainModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
