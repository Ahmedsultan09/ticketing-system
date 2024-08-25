import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useFetchTickets = () => {
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    async function fetchAllTickets() {
      const response = await axiosInstance.get("/tickets");
      const allTickets = await response.data;
      setAllTickets(allTickets);
    }
    fetchAllTickets();
  }, []);

  return allTickets;
};

export default useFetchTickets;
