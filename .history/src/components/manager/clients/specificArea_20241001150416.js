import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";
import AddBranchModal from "./addBranchModal";
import { Button } from "src/ui/components/button";
import { Button as MUIButton } from "@mui/material";

function SpecificArea() {
  const [specificClient, setSpecificClient] = useState({});
  const [open, setOpen] = useState(false);
  const params = useParams();
  const client = useFetchClients(params.clientID);
  const currentGovID = parseInt(params.govID);
  const currentAreaID = parseInt(params.areaID);

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
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
          {" "}
          {specificClient.governorates.find((gov) => gov.id === currentGovID) && specificClient.governorates.find((gov) => gov.id === currentGovID).areas.find((area) => area.id === currentAreaID).branches.map((branch) => {
            <NavigationCard
                      key={branch.id}
                      name={branch.name}
                      path={`area/${branch.id}`}
                      color="area"
                      title="Branches"
                      govName={area.name}
                      count={branch?.branches?.lenegth}
                    >
                      {" "}
                      {deleteMode && (
                        <MUIButton
                          variant="contained"
                          color="error"
                          onClick={() => handleClickOpen(area.id, area.name)}
                          size="small"
                          startIcon={<DeleteForeverIcon />}
                          className="flex flex-row items-center gap-2 justify-center"
                        >
                          {" "}
                          Delete
                        </MUIButton>
                      )}
                    </NavigationCard>
          }))}
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
