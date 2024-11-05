import { useEffect, useState } from "react";
import axiosInstance from "src/api/axiosInstance";

const useFetchClients = (id = undefined) => {
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    async function fetchAllEngineers() {
      if (id !== undefined) {
        const response = await axiosInstance.get(`/clients/${parseInt(id)}`);
        const allClientsData = await response.data;
        setAllClients(allClientsData);
      } else {
        const response = await axiosInstance.get("/clients");
        const allClientsData = await response.data;
        setAllClients(allClientsData);
      }
    }
    fetchAllEngineers();
  }, [id]);

  return allClients;
};

export default useFetchClients;
