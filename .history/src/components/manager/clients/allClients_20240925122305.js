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

  function handleDelete(id) {
    axiosInstance
      .delete(`/clients/${id}`)
      .then((response) => {
        console.log("Object deleted successfully", response.data);
      })
      .catch((error) => {
        console.error("Error deleting the object:", error);
      });
  }

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
        <div className="w-full flex flex-row flex-wrap gap-4">
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
      <AddCllientModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default AllClients;