import React from "react";

import { Button } from "../../../ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/components/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/components/card";
import { DownloadForOffline } from "@mui/icons-material";
import MachineCard from "src/ui/cards/machineCard";
import { Carousel } from "react-responsive-carousel";

function VisitDetailsModal({
  openDetailsModal,
  setOpenDetailsModal,
  closeDetailsModal,
  combinedReport,
  machines,
}) {
  return (
    <Dialog open={openDetailsModal} onOpenChange={setOpenDetailsModal}>
      <DialogContent
        className="bg-background shadow-sm rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Visit details</DialogTitle>
        </DialogHeader>
        <Card className="bg-background shadow-sm rounded-lg lg:col-span-1">
          <CardHeader>
            <CardTitle>Submitted visit details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-6">
            <div className="grid gap-1">
              <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                Machines
              </span>
              <div className="w-full flex flex-wrap justify-between">
                {" "}
                {machines.map((machine) => {
                  return (
                    <MachineCard
                      key={machine.serialNumber}
                      serialNumber={machine.serialNumber}
                      property={machine.ownership}
                      status={machine.status}
                      meterReading={machine.meterReading}
                      machineType={machine.machineType}
                      model={machine.machineModel}
                    />
                  );
                })}
              </div>
            </div>
            <div className="grid gap-1">
              <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                Combined report
              </span>
              <Button className="bg-red-800">
                Download <DownloadForOffline sx={{ mx: "5px" }} />
              </Button>
            </div>
          </CardContent>
        </Card>
        <DialogFooter>
          <Button className="w-full" onClick={closeDetailsModal}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default VisitDetailsModal;
