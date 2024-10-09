import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";
import AddBranchModal from "./addBranchModal";
import { Button } from "src/ui/components/button";

function SpecificArea() {
  const [specificClient, setSpecificClient] = useState({});
  const [open, setOpen] = useState(false);
  const params = useParams();
  const client = useFetchClients(params.clientID);
  const currentGovID = parseInt(params.govID);
  const currentAreaID = parseInt(params.areaID);
  const currentGov = specificClient.governorates.find(
    (gov) => gov.id === currentGovID
  );

  useEffect(() => {
    console.log(currentGov);
  }, [currentGov]);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  useEffect(() => {
    setSpecificClient(client);
  }, [client]);
  function handleChangeBranch(data) {
    setSpecificClient(data);
  }

  return (
    <div className="container">
      {" "}
      <div className="w-full my-4 flex flex-row justify-between items-center">
        <Button onClick={handleBack}>
          <ArrowBackIcon /> Back
        </Button>
        <Button onClick={handleOpen}>أضف منطقة</Button>
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <Typography>أختر الفرع</Typography>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center"></div>{" "}
      </div>
      <AddBranchModal
        handleClose={handleClose}
        open={open}
        handleChangeBranch={handleChangeBranch}
      />
    </div>
  );
}

export default SpecificArea;
