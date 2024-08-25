import React from "react";
import { Link as Direct } from "react-router-dom";

function TaskCard({
  date,
  ticketNumber,
  serialNumber,
  issue,
  client,
  branch,
  priority,
}) {
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
    >
      <div className="p-6 grid gap-2">
        <div className="flex items-center justify-between">
          <p className="font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
            S/N: {serialNumber.toString().toUpperCase()}
          </p>
          <span className="text-sm font-medium w-fit h-fit bg-orange-600 text-white text-md rounded-lg px-2 ">
            # {ticketNumber}
          </span>
        </div>
        <div>
          <span className="text-sm font-medium">{date}</span>
          <p className="text-muted-foreground text-sm">{issue}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 text-muted-foreground"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="text-sm">{client}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4 text-muted-foreground"
            >
              <line x1="2" x2="5" y1="12" y2="12"></line>
              <line x1="19" x2="22" y1="12" y2="12"></line>
              <line x1="12" x2="12" y1="2" y2="5"></line>
              <line x1="12" x2="12" y1="19" y2="22"></line>
              <circle cx="12" cy="12" r="7"></circle>
            </svg>
            <span className="text-sm">{branch}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {priority === "high" ? (
              <div className="inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white">
                {`${priority[0].toUpperCase()}${priority
                  .split("")
                  .splice(1, priority.split("").length)
                  .join("")}`}
              </div>
            ) : (
              <div className="inline-flex items-center justify-center rounded-md bg-yellow-500 px-3 py-1 text-xs font-medium text-white">
                {`${priority[0].toUpperCase()}${priority
                  .split("")
                  .splice(1, priority.split("").length)
                  .join("")}`}
              </div>
            )}
          </div>
          <Direct
            to={`/calls/${ticketNumber}`}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            View Ticket
          </Direct>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
