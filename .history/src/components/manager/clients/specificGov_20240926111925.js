import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";

function SpecificGov() {
  const [specificClient, setSpecificClient] = useState({});
  const params = useParams();
  const client = useFetchClients(params.clientID);
  const currentGovID = parseInt(params.govID);
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  useEffect(() => {
    setSpecificClient(client);
  }, [client]);
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
        <Typography>أختر المنطقة</Typography>
        <div className="w-full flex justify-between flex-wrap flex-row gap-4">
          {" "}
          {specificClient?.governorates?.[currentGovID - 1]?.areas ? (
            specificClient.governorates[currentGovID - 1].areas.map((area) => (
              <NavigationCard
                key={area.id}
                name={area.name}
                path={`area/${area.id}`}
              />
            ))
          ) : (
            <Typography>لا توجد مناطق متاحة</Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecificGov;
