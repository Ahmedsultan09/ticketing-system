import { useEffect, useState } from "react";
import axiosInstance from "src/api/axiosInstance";

const useFetchClients = (id = undefined) => {
  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    async function fetchAllEngineers() {
      const response = await axiosInstance.get("/clients");
      const allClientsData = await response.data;

      if (id !== undefined) {
        setAllClients(allClientsData[parseInt(id) - 1]);
      } else {
        setAllClients(allClientsData);
      }
    }
    fetchAllEngineers();
  }, [id]);

  return allClients;
};

export default useFetchClients;
