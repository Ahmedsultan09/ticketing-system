import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/components/dialog";
import { Button } from "../../../ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/components/card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Label } from "../../..//ui/components/label";
import { Input } from "../../..//ui/components/input";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import RadioBullet from "../../../ui/radioBullets";
import EngineerSpareParts from "../../manager/users/engineers/engineerSpareParts";
import { Bold } from "lucide-react";

function EditMachineCard({
  declaredStatus,
  currentMachine,
  setCurrentMachine,
  doneMachines,
  handleAddDoneMachines,
  handleRemoveDoneMachines,
  currentRv,
  handleSpareParts,
}) {
  const [status, setStatus] = useState(declaredStatus);
  const [scrabbedReason, setScrabbedReason] = useState("");
  const [currentMachineDetails, setCurrentMachineDetails] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [meterIsValid, setMeterIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);

  function handleStatus(e) {
    setStatus(e.target.value);
    setCurrentMachineDetails({
      ...currentMachineDetails,
      status: e.target.value,
    });
  }
  function handleMeterReading(e) {
    setCurrentMachineDetails({
      ...currentMachineDetails,
      meterReading: e.target.value,
    });
  }

  function handleOpenModal(machine) {
    setEditModalOpen(true);
    setCurrentMachineDetails(machine);
  }

  function closeEditModal() {
    setEditModalOpen(false);
  }

  function handleSave() {
    closeEditModal();
    setCurrentMachineDetails({
      ...currentMachineDetails,
      meterReading: currentMachineDetails.meterReading,
      status: currentMachineDetails.status,
      report: currentMachineDetails.report,
    });
    const matchedMachine = doneMachines.find((machine) => {
      return machine.id === currentMachineDetails.id;
    });
    if (matchedMachine) {
      handleRemoveDoneMachines(currentMachineDetails);
      handleAddDoneMachines(currentMachineDetails);
    }
  }

  useEffect(() => {
    if (
      currentMachineDetails.meterReading !== "" &&
      currentMachineDetails.status !== "" &&
      meterIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [currentMachineDetails, meterIsValid]);

  useEffect(() => {
    if (
      currentMachineDetails?.meterReading &&
      currentRv?.machines?.length &&
      parseInt(currentMachineDetails.meterReading) >
        parseInt(
          currentRv?.machines[parseInt(currentMachineDetails.id) - 1]
            ?.meterReading
        )
    ) {
      setMeterIsValid(true);
    } else {
      setMeterIsValid(false);
    }
  }, [currentMachineDetails, currentRv]);

  return (
    <div>
      <Card className="bg-background shadow-sm rounded-lg w-full overflow-auto ">
        <CardHeader
          className="flex flex-row justify-between items-center"
          dir="rtl"
        >
          <CardTitle>الماكينات اللتي تم الإنتهاء منها</CardTitle>

          <Typography
            className="text-muted-foreground"
            variant="overline"
            fontWeight="bold"
          >
            ( {doneMachines?.length} )
          </Typography>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 lg:grid-cols-1 grid-cols-1">
            {doneMachines?.map((machine) => (
              <div
                key={machine?.id}
                className="flex w-full flex-wrap gap-1 items-center justify-between border rounded p-2"
              >
                <span className="text-sm font-medium  bg-neutral-600 text-white w-fit px-1 rounded-sm">
                  {machine?.serialNumber.toString().toUpperCase()}
                </span>
                <span className="text-green-700">
                  <CheckCircleIcon />
                </span>
                <div className="flex flex-wrap items-center justify-between w-full">
                  <p className="text-muted-foreground">
                    {machine.machineBrand} - {machine.machineModel} -{" "}
                    {machine.meterReading}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-black text-white mt-1"
                    onClick={() => handleOpenModal(machine)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-background shadow-sm rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Machine Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 p-6">
            <div className="grid gap-2">
              <Label htmlFor="meter-reading">Meter Reading</Label>
              <div>
                <Input
                  id="meter-reading"
                  type="number"
                  placeholder="Enter meter reading"
                  className={`${
                    !meterIsValid &&
                    "focus:ring-0 border-input border-red-700 focus-visible:ring-0"
                  }`}
                  value={currentMachineDetails.meterReading}
                  onChange={(e) =>
                    setCurrentMachineDetails({
                      ...currentMachineDetails,
                      meterReading: e.target.value,
                    })
                  }
                />
                {!meterIsValid && (
                  <div className="text-red-500">
                    The meter reading you entered is below the latest read
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="close-action">Close Ticket As</Label>
              <FormControl>
                <RadioGroup
                  defaultValue=""
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  value={currentMachineDetails.status}
                  onChange={handleStatus}
                >
                  <FormControlLabel
                    value="stable"
                    control={<RadioBullet />}
                    label="Stable"
                  />
                  <FormControlLabel
                    value="spare-parts"
                    control={<RadioBullet />}
                    label="Spare parts"
                  />
                  <FormControlLabel
                    value="scrabbed"
                    control={<RadioBullet />}
                    label="Scrabbed / Replacement"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            {status === "spare-parts" && (
              <div className="grid gap-2">
                <Label htmlFor="spare-parts-needed">Spare Parts Needed</Label>
                <EngineerSpareParts
                  saveBtn={false}
                  handleSpareParts={handleSpareParts}
                />
              </div>
            )}

            {status === "scrabbed" && (
              <div className="grid gap-2">
                <Label htmlFor="scrabbed-reason">Reason for scrabbing</Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="solution-details"
                  placeholder="Enter reason for scrabbing"
                  value={scrabbedReason}
                  onChange={(e) =>
                    setCurrentMachine({
                      ...currentMachine,
                      scrabbedReason: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={handleSave}
              disabled={!formIsValid}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditMachineCard;
