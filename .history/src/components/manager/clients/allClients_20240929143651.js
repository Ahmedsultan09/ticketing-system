import { Box, Button } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import axiosInstance from "../../../api/axiosInstance";
import React, { useEffect, useState } from "react";
import AddCllientModal from "./addClientModal";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import NavigationCard from "../../../ui/cards/navigationCard";
import Header from "src/ui/components/header";
import useFetchClients from "src/hooks/useFetchClients";

function AllClients() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const allClients = useFetchClients();
  useEffect(() => {
    setClients(allClients);
  }, [allClients]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleClientChange(data) {
    setClients((prev) => [...prev, data]);
  }

  function handleDelete(id) {
    axiosInstance
      .delete(`/clients/${id}`)
      .then((response) => {
        const filteredClients = clients.filter(
          (client) => client.id !== response.data.id
        );
        setClients(filteredClients);
      })
      .catch((error) => {
        console.error("Error deleting the object:", error);
      });
  }

  return (
    <div className="w-full h-full ">
      {" "}
      <Header
        title="All Clients"
        description="Here you can find all clients that has been added recently."
        btnComponent={
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant="contained"
              color="success"
              onClick={handleOpen}
              className="flex flex-row items-center"
            >
              Add Client
              <AddCircleSharpIcon className="mx-2 text-xs" />
            </Button>
            <Button>Delete Current Client</Button>
          </div>
        }
      />
      <Box
        sx={{
          p: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          minHeight: "100%",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center relative">
          {" "}
          {clients?.map((client) => {
            return (
              <NavigationCard
                key={client.id}
                name={client.clientName}
                path={`/client/${client.id}`}
                color="clients"
                count={client?.governorates?.length}
                title="Governorates"
              >
                <RemoveCircleIcon onClick={() => handleDelete(client.id)} />
              </NavigationCard>
            );
          })}
        </div>
        {/*SEPARTOR SEPARTOR SEPARTOR SEPARTOR */}

        {/*SEPARTOR SEPARTOR SEPARTOR SEPARTOR SEPARTOR  */}
      </Box>
      <AddCllientModal
        open={open}
        handleClose={handleClose}
        handleClientChange={handleClientChange}
      />
    </div>
  );
}

export default AllClients;