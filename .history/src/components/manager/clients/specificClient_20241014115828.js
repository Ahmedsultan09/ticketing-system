import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchClients from "src/hooks/useFetchClients";
import ClientInfo from "./clientInfo";
import { Typography } from "@mui/material";
import { Button } from "src/ui/components/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigationCard from "src/ui/cards/navigationCard";
import AddGovernorateModal from "./addGovernorateModal";
import axiosInstance from "src/api/axiosInstance";
import DeleteModal from "./deleteModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button as MUIButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function SpecificClient() {
  const [specificClient, setSpecificClient] = useState({});
  const [openDeleteModal, setOpenDeletModal] = useState(false);
  const [selectedGovId, setSelectedGovId] = useState(null);
  const [selecteGovName, setSelectedGovName] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);

  const params = useParams();
  const client = useFetchClients(params.clientID);
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  useEffect(() => {
    setSpecificClient(client);
  }, [client]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleGovernoratesChange(data) {
    setSpecificClient(data);
  }
  const handleDelete = (govId) => {
    const updatedGovernorates = specificClient.governorates.filter(
      (gov) => gov.id !== govId
    );

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
        <Button onClick={handleOpen}>أضف محافظة</Button>
      </div>
      <ClientInfo clients={specificClient} />
      <div className="w-full mt-4" dir="rtl">
        <div className="w-full flex lg:flex-row flex-col justify-between items-center ">
          <Typography className="w-fit px-2 bg-red-600 rounded-xl text-white">
            إختر المحافظة
          </Typography>
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

        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {" "}
          {specificClient?.governorates?.map((gov) => {
            return (
              <NavigationCard
                key={gov.id}
                name={gov.name}
                path={`gov/${gov.id}`}
                color="gov"
                count={gov.areas.length}
                title="Areas"
              >
                {deleteMode && (
                  <MUIButton
                    variant="contained"
                    color="error"
                    onClick={() => handleClickOpen(gov.id, gov.name)}
                    size="small"
                    startIcon={<DeleteForeverIcon />}
                    className="flex flex-row items-center gap-2 justify-center"
                  >
                    {" "}
                    Delete
                  </MUIButton>
                )}
              </NavigationCard>
            );
          })}
        </div>
      </div>
      <AddGovernorateModal
        open={open}
        handleClose={handleClose}
        handleGovernoratesChange={handleGovernoratesChange}
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

export default SpecificClient;
