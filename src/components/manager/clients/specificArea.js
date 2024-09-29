import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";

function SpecificArea() {
  const [specificClient, setSpecificClient] = useState({});
  const params = useParams();
  const client = useFetchClients(params.clientID);
  const currentGovID = parseInt(params.govID);
  const currentAreaID = parseInt(params.areaID);
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
        <Typography>أختر الفرع</Typography>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
          {" "}
          {specificClient?.governorates?.[currentGovID - 1]?.areas?.[
            currentAreaID - 1
          ]?.branches ? (
            specificClient.governorates[currentGovID - 1].areas[
              currentAreaID - 1
            ].branches.map((branch) => (
              <NavigationCard
                key={branch.id}
                name={branch.name}
                path={`branch/${branch.id}`}
              />
            ))
          ) : (
            <Typography>لا توجد فروع متاحة</Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpecificArea;
