import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useFetchTickets = (arrOfIds = undefined) => {
  const [specificTickets, setSpecificTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    if (arrOfIds === undefined) {
      async function fetchAllTickets() {
        const response = await axiosInstance.get("/tickets");
        const allTickets = await response.data;
        setAllTickets(allTickets); // Update ref instead of state
      }
      fetchAllTickets();
    }
  }, [arrOfIds]);

  useEffect(() => {
    if (arrOfIds !== undefined) {
      async function fetchSpecificTickets() {
        const response = await axiosInstance.get("/tickets");
        const allTickets = await response.data;
        const specificTickets = allTickets.filter((ticket) =>
          arrOfIds?.includes(parseInt(ticket.id))
        );
        setSpecificTickets(specificTickets);
      }
      fetchSpecificTickets();
    }
  }, [arrOfIds]);

  return arrOfIds === undefined ? allTickets : specificTickets;
};

export default useFetchTickets;
