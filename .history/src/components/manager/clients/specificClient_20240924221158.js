import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";

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
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <Typography>أختر المحافظة</Typography>
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
    </div>
  );
}

export default SpecificClient;
