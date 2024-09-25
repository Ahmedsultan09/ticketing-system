import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Button as BlackButton } from "src/ui/components/button";
import MultipleSelect from "../../../ui/components/multipleSelect";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import ContractRules from "../../../ui/contractRules";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../api/axiosInstance";
import useFetchClients from "src/hooks/useFetchClients";
import { useParams } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

export default function AddClientModal({
  handleClose,
  open,
  handleClientChange,
}) {
  const [operators, setOperators] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [clientID, setCurrentClientID] = useState("");
  const [areaName, setAreaName] = useState("");
  const clients = useFetchClients();
  const params = useParams();
  useEffect(() => {
    setCurrentClientID(params.cleintID);
  });

  function handleChangeOperator(data) {
    setSelectedOperators(data);
  }

  function handleAreaName(e) {
    setAreaName(e.target.value);
  }

  function handleCreateArea() {
    axiosInstance
      .post("/clients", {
        area: areaName,
        rules: rules,
        operatareaors: selectedOperators,
      })
      .then((res) => handleClientChange(res.data));
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
          <BlackButton className="w-full mt-4" onClick={handleCreateArea}>
            Create
          </BlackButton>
        </Box>
      </Modal>
    </div>
  );
}
