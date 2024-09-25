import React from "react";
import { useParams } from "react-router-dom";
import Tickets from "./allTickets";

function TicketType() {
  const params = useParams();
  return (
    <div>
      {params.ticketType === "opened" && <Tickets type="opened" />}
      {params.ticketType === "closed" && <Tickets type="closed" />}
      {params.ticketType === "pending" && <Tickets type="pending" />}
    </div>
  );
}

export default TicketType;
