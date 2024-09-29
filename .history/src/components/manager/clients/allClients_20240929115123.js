import { Box, Button, Typography } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import axiosInstance from "../../../api/axiosInstance";
import React, { useEffect, useState } from "react";
import AddCllientModal from "./addClientModal";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import NavigationCard from "../../../ui/cards/navigationCard";
import Header from "src/ui/components/header";
import AddClientModal from "./addClientModal";

function AllClients() {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      const response = await axiosInstance.get("/clients");
      const allClients = await response.data;
      setClients(allClients);
    }
    fetchClients();
  }, []);

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
        title="All Titles"
        description="Here you can find all clients that has been added recently."
        btnComponent={
          <Button
            variant="contained"
            color="success"
            onClick={handleOpen}
            className="flex flex-row items-center"
          >
            Add Client
            <AddCircleSharpIcon className="mx-2 text-xs" />
          </Button>
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
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
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
