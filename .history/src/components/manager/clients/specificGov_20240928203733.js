import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Typography } from "@mui/material";
import { Button } from "src/ui/components/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";
import AddAreaModal from "./addAreaModal";

function SpecificGov() {
  const [specificClient, setSpecificClient] = useState({});
  const [open, setOpen] = useState(false);
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <div className="w-full mt-4">
        <Typography dir="rtl">أختر المنطقة</Typography>
        <div className="container h-[50vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  items-center">
          {" "}
          {specificClient?.governorates?.length ? (
            specificClient.governorates
              .filter((gov) => gov.id === parseInt(currentGovID)) // Find the governorate by ID
              .map((gov) =>
                gov.areas.length ? (
                  gov.areas.map((area) => (
                    <NavigationCard
                      key={area.id}
                      name={area.name}
                      path={`area/${area.id}`}
                    />
                  ))
                ) : (
                  <Typography key="no-area">لم تقم بإضافة منطقة بعد</Typography>
                )
              )
          ) : (
            <Typography>لم تقم بإضافة منطقة بعد</Typography>
          )}
        </div>
      </div>
      <AddAreaModal handleClose={handleClose} open={open} />
    </div>
  );
}

export default SpecificGov;
