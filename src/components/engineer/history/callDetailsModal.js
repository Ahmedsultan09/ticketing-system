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
import { CheckCircleIcon } from "lucide-react";
import { DownloadForOffline } from "@mui/icons-material";

function CallDetailsModal({
  result,
  openDetailsModal,
  setOpenDetailsModal,
  closeDetailsModal,
  operator,
}) {
  return (
    <Dialog open={openDetailsModal} onOpenChange={setOpenDetailsModal}>
      <DialogContent
        className="bg-background shadow-sm rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Call details</DialogTitle>
        </DialogHeader>
        <div className="w-full flex lg:flex-row flex-col flex-wrap justify-between">
          <Card className="bg-background shadow-sm rounded-lg lg:col-span-1 lg:w-[60%] w-full">
            <CardHeader>
              <CardTitle>Submitted call details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Status
                </span>
                {result?.status === "solved" && (
                  <p className="text-muted-foreground flex flex-row items-center justify-start">
                    Solved{" "}
                    <span className="mx-1 text-sm text-green-700">
                      <CheckCircleIcon className="!text-sm" />
                    </span>
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Entered meter reading
                </span>
                <p className="text-muted-foreground">{result?.meterReading}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Submitted solution
                </span>
                <p className="text-muted-foreground">
                  {result?.solutionDetails}
                </p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Report
                </span>
                <Button className="bg-red-800">
                  Download <DownloadForOffline sx={{ mx: "5px" }} />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-sm rounded-lg lg:col-span-1 lg:w-[38%] w-full">
            <CardHeader>
              <CardTitle>Operator details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Operator name:
                </span>
                <p className="text-muted-foreground">{operator}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Phone:
                </span>
                <p className="text-muted-foreground">01111236361</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={closeDetailsModal}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CallDetailsModal;
