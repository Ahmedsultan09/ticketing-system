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

function SpecificClient() {
  const [specificClient, setSpecificClient] = useState({});
  const [openDeleteModal, setOpenDeletModal] = useState(false);
  const [selectedGovId, setSelectedGovId] = useState(null);

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

  const handleClickOpen = (id) => {
    setOpenDeletModal(true);
    setSelectedGovId(id);
    console.log(selectedGovId);
  };

  const handleClickClose = () => {
    setOpenDeletModal(false);
  };

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
        <Typography className="w-fit px-2 bg-red-600 rounded-xl text-white">
          إختر المحافظة
        </Typography>
        <div className="container mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
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
                <MUIButton
                  variant="contained"
                  color="error"
                  onClick={() => handleClickOpen(gov.id)}
                  size="small"
                  startIcon={<DeleteForeverIcon />}
                  className="flex flex-row items-center gap-2 justify-center"
                >
                  {" "}
                  Delete
                </MUIButton>
                {openDeleteModal && (
                  <DeleteModal
                    client={client}
                    govName={gov.name}
                    handleDelete={handleDelete}
                    handleClickClose={handleClickClose}
                    openDeleteModal={openDeleteModal}
                    id={selectedGovId}
                  />
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
    </div>
  );
}

export default SpecificClient;
