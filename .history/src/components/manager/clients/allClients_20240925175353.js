import { Box, Button, Typography } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import axiosInstance from "../../../api/axiosInstance";
import React, { useEffect, useState } from "react";
import AddCllientModal from "./addClientModal";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import NavigationCard from "../../../ui/cards/navigationCard";

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

  useEffect(() => {
    console.log(clients);
  }, [clients]);

  return (
    <div className="w-full h-full ">
      {" "}
      <div className="w-full h-16 bg-white flex flex-row items-center justify-between p-4 border-b border-gray-400">
        <div className="flex flex-row gap-2">
          <Typography className="text-orange-600 !font-bold">
            All Clients
          </Typography>
        </div>
        <Button color="success" variant="contained" onClick={handleOpen}>
          Add new client
          <AddCircleSharpIcon sx={{ width: 18, height: 18, marginLeft: 1 }} />
        </Button>
      </div>
      <Box
        sx={{
          p: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <div className="container h-[70vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border border-red-700 justify-center">
          {" "}
          {clients?.map((client) => {
            return (
              <NavigationCard
                key={client.id}
                name={client.clientName}
                path={`/client/${client.id}`}
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
