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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function SpecificArea() {
  const [specificClient, setSpecificClient] = useState({});
  const [governorates, setGovernorates] = useState([]);
  const [currentGov, setCurrentGov] = useState({});
  const [branches, setBranches] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const params = useParams();
  const client = useFetchClients(params.clientID);
  const currentGovID = parseInt(params.govID);
  const currentAreaID = parseInt(params.areaID);

  useEffect(() => {
    if (Array.isArray(governorates) && governorates.length > 0) {
      const branches = governorates
        ?.find((gov) => gov.id === currentGovID)
        ?.areas.find((area) => area.id === currentAreaID)?.branches;
      setBranches(branches);
    }
    console.log(branches);
  }, [branches, currentAreaID, currentGovID, governorates]);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  useEffect(() => {
    setSpecificClient(client);
    setGovernorates(client.governorates);
  }, [client]);

  // useEffect(() => {
  // }, [currentGovID, governorates]);
  function handleChangeBranch(data) {
    setSpecificClient(data);
  }

  const handleDeleteMode = () => setDeleteMode(true);
  const handleSave = () => setDeleteMode(false);

  return (
    <div className="container">
      {" "}
      <div className="w-full my-4 flex flex-row justify-between items-center">
        <Button onClick={handleBack}>
          <ArrowBackIcon /> Back
        </Button>
        <Button onClick={handleOpen}>أضف فرع</Button>
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <div className="w-full flex flex-row justify-between items-center ">
          <Typography className="w-fit px-2 bg-red-600 rounded-xl text-white">
            إختر المنطقة
          </Typography>
          {!deleteMode ? (
            <MUIButton
              variant="contained"
              color="error"
              onClick={handleDeleteMode}
              className="flex lg:flex-row flex-col items-center w-60"
            >
              Delete Area <DeleteForeverIcon className="mx-2 text-xs" />
            </MUIButton>
          ) : (
            <MUIButton
              variant="contained"
              color="success"
              onClick={handleSave}
              className="flex flex-row items-center w-52"
            >
              Done <CheckBoxIcon className="mx-2 text-xs" />
            </MUIButton>
          )}
        </div>{" "}
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
          {branches.length > 0 &&
            branches.map((branch) => (
              <NavigationCard
                key={branch.id}
                name={branch.name}
                path={`branch/${branch.id}`}
                color="area"
                title="Branches"
                govName={currentGov.name}
                count={branches.length}
              />
            ))}
        </div>{" "}
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
