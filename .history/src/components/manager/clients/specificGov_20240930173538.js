import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Typography } from "@mui/material";
import { Button } from "src/ui/components/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";
import AddAreaModal from "./addAreaModal";
import axiosInstance from "src/api/axiosInstance";
import DeleteModal from "./deleteModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button as MUIButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function SpecificGov() {
  const [specificClient, setSpecificClient] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeletModal] = useState(false);

  const [selectedGovId, setSelectedGovId] = useState(null);
  const [selecteGovName, setSelectedGovName] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
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

  const handleDelete = (areaId) => {
    const selectedGovernorate = specificClient.governorates.find(
      (gov) => gov.id === currentGovID
    );

    const updatedAreas = selectedGovernorate.areas.filter(
      (area) => area.id !== areaId
    );
    const selectedArea = updatedAreas.find((area) => area.id === areaId);
    const modifedGovernorate = { ...selectedGovernorate, areas: updatedAreas };
    const updatedGovernorates = [
      ...specificClient.governorates,
      modifedGovernorate,
    ];
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

  function handleChangeArea(data) {
    setSpecificClient(data);
  }

  const handleClickOpen = (id, name) => {
    setOpenDeletModal(true);
    setSelectedGovId(id);
    setSelectedGovName(name);
  };

  const handleClickClose = () => {
    setOpenDeletModal(false);
  };

  const handleDeleteMode = () => setDeleteMode(true);
  const handleSave = () => setDeleteMode(false);
  return (
    <div className="container">
      {" "}
      <div className="w-full my-4 flex flex-row justify-between items-center">
        <Button onClick={handleBack}>
          <ArrowBackIcon /> Back
        </Button>
        <Button onClick={handleOpen}>أضف منطقة</Button>
        {!deleteMode ? (
          <MUIButton
            variant="contained"
            color="error"
            onClick={handleDeleteMode}
            className="flex lg:flex-row flex-col items-center w-60"
          >
            Delete Governorate <DeleteForeverIcon className="mx-2 text-xs" />
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
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <Typography
          dir="rtl"
          className="w-fit px-2 bg-red-600 rounded-xl text-white"
        >
          أختر المنطقة
        </Typography>
        <div className="container grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  items-center">
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
                      color="area"
                      title="Branches"
                      govName={gov.name}
                      count={area?.branches?.lenegth}
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
      <AddAreaModal
        handleClose={handleClose}
        open={open}
        handleChangeArea={handleChangeArea}
      />
      {openDeleteModal && (
        <DeleteModal
          client={client}
          govName={selecteGovName}
          handleDelete={handleDelete}
          handleClickClose={handleClickClose}
          openDeleteModal={openDeleteModal}
          id={selectedGovId}
        />
      )}
    </div>
  );
}

export default SpecificGov;