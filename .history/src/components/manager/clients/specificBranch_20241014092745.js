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
import DeleteModal from "./deleteModal";
import axiosInstance from "src/api/axiosInstance";
import AddMachineModal from "./addMachineModal";
import MachineCard from "src/ui/cards/machineCard";

function SpecificBranch() {
  const [specificClient, setSpecificClient] = useState({});
  const [governorates, setGovernorates] = useState([]);
  const [currentGov, setCurrentGov] = useState({});
  const [machines, setMachines] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branches, setBranches] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [openDeleteModal, setOpenDeletModal] = useState(false);

  const params = useParams();
  const client = useFetchClients(params.clientID);
  const currentGovID = parseInt(params.govID);
  const currentAreaID = parseInt(params.areaID);
  const branchID = parseInt(params.branchID);

  const handleClickOpen = (id, name) => {
    setOpenDeletModal(true);
    setBranchId(id);
    setBranchName(name);
  };

  const handleClickClose = () => {
    setOpenDeletModal(false);
  };

  const handleDelete = (branchId) => {
    const updatedGovernorates = specificClient.governorates.map((gov) => {
      if (gov.id === currentGovID) {
        const updatedAreas = gov.areas.map((area) => {
          if (area.id === currentAreaID) {
            // Filter out the branch to be deleted from the area's branches
            const updatedBranches = area.branches.filter(
              (branch) => branch.id !== branchId
            );

            // Return the updated area with the filtered branches
            return { ...area, branches: updatedBranches };
          }
          return area; // If the area is not the target, return it as is
        });

        // Return the updated governorate with the updated areas
        return { ...gov, areas: updatedAreas };
      }

      // If no match for the governorate, return it as is

      return gov;
    });

    // Update the client object with the new governorate list
    const updatedClient = {
      ...specificClient,
      governorates: updatedGovernorates,
    };

    // Send a PUT or PATCH request to update the client data on the server
    axiosInstance
      .put(`/clients/${params.clientID}`, updatedClient)
      .then((response) => {
        setSpecificClient(response.data); // Update the state with the new client data
      })
      .catch((error) => {
        console.error("Error deleting the governorate:", error);
      });
  };

  useEffect(() => {
    if (
      Array.isArray(specificClient.governorates) &&
      specificClient.governorates.length > 0
    ) {
      const machines = specificClient.governorates
        ?.find((gov) => gov.id === currentGovID)
        ?.areas.find((area) => area.id === currentAreaID)
        ?.branches.find((branch) => branch.id === branchID).machines;
      setMachines(machines);
    }
  }, [machines, currentAreaID, currentGovID, branchID, specificClient]);
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

  function handleChangeClient(data) {
    setSpecificClient(data);
  }

  const handleDeleteMode = () => setDeleteMode(true);
  const handleSave = () => setDeleteMode(false);

  useEffect(() => {
    const matchedGov = governorates?.find((gov) => gov.id === currentGovID);
    setCurrentGov(matchedGov);
  }, [currentGovID, governorates]);

  useEffect(() => {
    console.log(machines);
  }, [machines]);
  return (
    <div className="container">
      {" "}
      <div className="w-full my-4 flex flex-row justify-between items-center">
        <Button onClick={handleBack}>
          <ArrowBackIcon /> Back
        </Button>
        <Button onClick={handleOpen}>أضف ماكينة</Button>
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <div className="w-full flex flex-row justify-between items-center ">
          <Typography className="w-fit px-2 bg-red-600 rounded-xl text-white">
            إختر الماكينة
          </Typography>
          {!deleteMode ? (
            <MUIButton
              variant="contained"
              color="error"
              onClick={handleDeleteMode}
              className="flex lg:flex-row flex-col items-center w-fit px-5"
            >
              Delete Branch <DeleteForeverIcon className="mx-2 text-xs" />
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
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 items-center mt-4">
          {machines.length > 0 &&
            machines.map((machine) => (
              <MachineCard
                key={machine.serialNumber}
                serialNumber={machine.serialNumber}
                model={machine.machineModel}
                machineType={machine.machineType}
                qrCode={machine.qrCode}
                brand={machine.machineBrand}
                property={machine.property === "non-ownership" ? false : true}
                client={specificClient.clientName}
              />
            ))}
        </div>{" "}
      </div>
      <AddMachineModal
        currentClient={client}
        govID={currentGovID}
        areaID={currentAreaID}
        branchID={branchID}
        handleClose={handleClose}
        open={open}
      />
      {openDeleteModal && (
        <DeleteModal
          client={client}
          govName={branchName}
          handleDelete={handleDelete}
          handleClickClose={handleClickClose}
          openDeleteModal={openDeleteModal}
          id={branchId}
        />
      )}
    </div>
  );
}

export default SpecificBranch;
