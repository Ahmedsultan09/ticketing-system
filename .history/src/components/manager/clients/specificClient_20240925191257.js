import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Typography } from "@mui/material";
import { Button } from "src/ui/components/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";
import AddAreaModal from "./addAreaModal";

function SpecificClient() {
  const [specificClient, setSpecificClient] = useState({});
  const params = useParams();
  const client = useFetchClients(params.clientID);
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  useEffect(() => {
    setSpecificClient(client);
  }, [client]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(specificClient);
  }, [specificClient]);
  return (
    <div className="container">
      {" "}
      <div className="w-full my-4">
        <Button onClick={handleBack}>
          <ArrowBackIcon /> Back
        </Button>
        <Button onClick={handleOpen}>Add Area</Button>
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <Typography>أختر المنطقة</Typography>
        <div className="w-full flex justify-between flex-wrap flex-row gap-4">
          {" "}
          {specificClient?.governorates?.map((gov) => {
            return (
              <NavigationCard
                key={gov.id}
                name={gov.name}
                path={`gov/${gov.id}`}
              />
            );
          })}
        </div>
      </div>
      <AddAreaModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default SpecificClient;