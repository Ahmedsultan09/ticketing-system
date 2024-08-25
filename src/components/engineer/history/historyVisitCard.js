import React, { useState } from "react";
import { Button } from "src/ui/components/button";
import VisitDetailsModal from "./visitDetailsModal";
// import VisitDetailsModal from "./visitDetailsModal";

function HistoryVisitCard({
  visitId,
  client,
  branch,
  visitDate,
  deadline,
  machines,
  operator,
  combinedReport,
}) {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const handleOpenDetailsModal = () => {
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
  };

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
          <p className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
            deadline
          </p>
          <p>{deadline}</p>
        </div>

        {/* ... other visit-specific fields */}
        <div className="border rounded p-3">
          <p className="text-sm font-medium bg-orange-500 text-white w-fit px-1 rounded-sm">
            Visit Date
          </p>
          <div className="flex flex-col gap-1">{visitDate}</div>
        </div>
      </div>
      <div className="absolute font-medium -top-1 -right-1 w-fit px-2 bg-cyan-600 rounded-xl text-white border border-gray-400">
        # {visitId}
      </div>
      <div className="w-full flex justify-end items-center">
        <Button onClick={handleOpenDetailsModal}>View more details</Button>
      </div>
      {openDetailsModal && (
        <VisitDetailsModal
          openDetailsModal={openDetailsModal}
          setOpenDetailsModal={setOpenDetailsModal}
          closeDetailsModal={handleCloseDetailsModal}
          machines={machines}
          operator={operator}
          combinedReport={combinedReport}
        />
      )}
    </div>
  );
}

export default HistoryVisitCard;
