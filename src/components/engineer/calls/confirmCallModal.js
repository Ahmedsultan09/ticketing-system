import React, { useState } from "react";

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

function ConfirmCallModal({
  callDetails,
  confirmModalOpen,
  setConfirmModalOpen,
  closeConfirmCallModal,
}) {
  return (
    <div className="flex">
      {" "}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="bg-background shadow-sm rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Quick Overview</DialogTitle>
          </DialogHeader>
          <Card className="bg-background shadow-sm rounded-lg lg:col-span-1">
            <CardHeader>
              <CardTitle>Submitted call details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Status
                </span>
                <p className="text-muted-foreground">{callDetails?.status}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Meter reading
                </span>
                <p className="text-muted-foreground">
                  {callDetails?.meterReading}
                </p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Solution
                </span>
                <p className="text-muted-foreground">
                  {callDetails?.solutionDetails}
                </p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Report
                </span>
                <p className="text-muted-foreground">{callDetails?.report}</p>
              </div>
            </CardContent>
          </Card>
          <DialogFooter>
            <Button className="w-full" onClick={closeConfirmCallModal}>
              Confirm details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConfirmCallModal;
