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
import { InfinitySpin } from "react-loader-spinner";

function SpecificGov() {
  const [specificClient, setSpecificClient] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeletModal] = useState(false);
  const [selectedGovId, setSelectedGovId] = useState(null);
  const [selecteGovName, setSelectedGovName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const client = useFetchClients(params.clientID);
  const currentGovID = parseInt(params.govID);
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    if (Object.keys(client).length > 0) {
      setSpecificClient(client);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [client]);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleDelete = (areaId) => {
    const updatedGovernorates = specificClient.governorates.map((gov) => {
      // Check if the governorate contains the area to be deleted
      if (gov.areas.some((area) => area.id === areaId)) {
        // Filter out the area to be deleted from the governorate's areas
        const updatedAreas = gov.areas.filter((area) => area.id !== areaId);
        const specificArea = gov.areas.find((area) => area.id === areaId);
        setAreaName(specificArea.name);

        // Return the updated governorate with the filtered areas
        return { ...gov, areas: updatedAreas };
      }
      // If no area to delete in this governorate, return it as is
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

  function handleChangeArea(data) {
    setSpecificClient({ ...data });
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
      </div>
      <ClientInfo
        clients={specificClient}
        isRvAllowed={specificClient?.isRvAllowed}
      />
      <div className="w-full mt-4" dir="rtl">
        <div className="w-full flex lg:flex-row flex-col gap-2 justify-between items-center ">
          <Typography className="w-fit px-2 bg-red-600 lg:rounded-xl  text-white">
            إختر المنطقة
          </Typography>
          {!deleteMode ? (
            <MUIButton
              variant="contained"
              color="error"
              onClick={handleDeleteMode}
              className="flex flex-row-reverse items-center lg:w-60 w-auto"
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
        </div>
        <div className="container grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  items-center">
          {" "}
          {isLoading ? (
            <div className="absolute top-0 left-0 bg-white bg-opacity-70 w-full h-screen flex justify-center items-center">
              <InfinitySpin
                visible={true}
                width="200"
                color="red"
                ariaLabel="infinity-spin-loading"
              />
            </div>
          ) : specificClient?.governorates?.length ? (
            specificClient.governorates
              .filter((gov) => gov.id === parseInt(currentGovID)) // Find the governorate by ID
              .map((gov) =>
                gov.areas.length ? (
                  gov.areas.map((area) => (
                    <NavigationCard
                      key={area.id}
                      name={area.name}
                      path={`/${client.id}/${currentGovID}/${area.id}`}
                      color="area"
                      title="Branches"
                      govName={gov.name}
                      count={area?.branches?.length}
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
                  <div className="w-[85dvw] h-[50dvh] text-2xl font-bold flex justify-center items-center my-5 text-center border">
                    لم تقم بإضافة أي منطقة
                  </div>
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
          areaName={areaName}
          handleDelete={handleDelete}
          handleClickClose={handleClickClose}
          openDeleteModal={openDeleteModal}
          id={selectedGovId}
          isArea={true}
        />
      )}
    </div>
  );
}

export default SpecificGov;
