import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Typography } from "@mui/material";
import { Button } from "src/ui/components/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";
import AddGovernorateModal from "./addGovernorateModal";

function SpecificClient() {
  const [specificClient, setSpecificClient] = useState({});
  const [specificGov, setSpecificGov] = useState({});
  const params = useParams();
  const client = useFetchClients(params.clientID);
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  useEffect(() => {
    setSpecificClient(client);
  }, [client]);
  useEffect(() => {
    setSpecificGov(specificClient.governorates);
  }, [specificClient.governorates]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="container">
      {" "}
      <div className="w-full my-4 flex flex-row justify-between items-center">
        <Button onClick={handleBack}>
          <ArrowBackIcon /> Back
        </Button>
        <Button onClick={handleOpen}>أضف محافظة</Button>
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <Typography className="w-fit px-2 bg-red-600 rounded-xl text-white">
          إختر المحافظة
        </Typography>
        <div className="container mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
          {" "}
          {specificGov.map((gov) => {
            return (
              <NavigationCard
                key={gov.id}
                name={gov.name}
                path={`gov/${gov.id}`}
                color="gov"
                count={gov.areas.length}
                title="Areas"
              />
            );
          })}
        </div>
      </div>
      <AddGovernorateModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default SpecificClient;
