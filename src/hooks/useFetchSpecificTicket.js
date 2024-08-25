import { useState, useEffect } from "react";
import useFetchTickets from "./useFetchTickets";

const useFetchSpecificTicket = (id) => {
  const [specificTicket, setSpecificTicket] = useState([]);
  const allTickets = useFetchTickets();

  useEffect(() => {
    const specificTicketDetails = allTickets?.filter((ticket) => {
      return parseInt(ticket?.id) === parseInt(id);
    });
    setSpecificTicket(...specificTicketDetails);
  }, [allTickets, id]);

  return specificTicket;
};

export default useFetchSpecificTicket;
