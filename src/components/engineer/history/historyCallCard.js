import React, { useState } from "react";
import { Button } from "src/ui/components/button";
import CallDetailsModal from "./callDetailsModal";

function HistoryCallCard({
  callId,
  client,
  branch,
  operator,
  ticketDate,
  responseDate,
  priority,
  issue,
  suggestion,
  machine,
  result,
}) {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  function handleOpenDetailsModal() {
    setOpenDetailsModal(true);
  }
  function handleCloseDetailsModal() {
    setOpenDetailsModal(false);
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4 my-4 relative w-full">
      <div className="flex flex-col gap-4">
        <div className="border rounded p-3">
          <p className="text-sm font-medium bg-black text-white w-fit px-1 rounded-sm">
            Client name
          </p>
          <p>{client}</p>
        </div>
        <div className="border rounded p-3">
          <p className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
            Branch
          </p>
          <p>{branch}</p>
        </div>
        <div className="border rounded p-3">
          <p className="text-sm font-medium bg-red-600 text-white w-fit px-1 rounded-sm">
            Issue
          </p>
          <p>{issue}</p>
        </div>
        <div className="border rounded p-3">
          <p className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
            Ticket date
          </p>
          <p>{ticketDate}</p>
        </div>
        <div className="border rounded p-3">
          <p className="text-sm font-medium bg-orange-500 text-white w-fit px-1 rounded-sm">
            Machine details
          </p>
          <div className="flex flex-col gap-1">
            <span>S/N: {machine?.serialNumber}</span>
            <span>Type: {machine?.machineType}</span>
            <span>Meter reading: {result?.meterReading}</span>
          </div>
        </div>
      </div>
      <div className="absolute font-medium -top-1 -right-1 w-fit px-2 bg-cyan-600 rounded-xl text-white border border-gray-400">
        # {callId}
      </div>
      <div className="w-full flex justify-end items-center">
        <Button onClick={handleOpenDetailsModal}>View more details</Button>
      </div>
      {openDetailsModal && (
        <CallDetailsModal
          openDetailsModal={openDetailsModal}
          setOpenDetailsModal={setOpenDetailsModal}
          closeDetailsModal={handleCloseDetailsModal}
          responseDate={responseDate}
          operator={operator}
          priority={priority}
          suggestion={suggestion}
          machine={machine}
          result={result}
        />
      )}
    </div>
  );
}

export default HistoryCallCard;
